/// <reference types="react" />
import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as utils from './utils';
import { Gesture, GestureDetector, GestureTouchEvent } from 'react-native-gesture-handler';
import { IReactNativeJoystickProps } from './types';

/**
 * ReactNativeJoystick - React Native用のカスタマイズ可能なジョイスティックコンポーネント
 *
 * @param onStart - ジョイスティックの操作が開始されたときに呼び出されるコールバック関数
 * @param onMove - ジョイスティックが移動したときに呼び出されるコールバック関数
 * @param onStop - ジョイスティックの操作が停止したときに呼び出されるコールバック関数
 * @param color - ジョイスティックの色 (デフォルト: '#000000')
 * @param radius - ジョイスティックラッパーの半径 (デフォルト: 150)
 * @param style - ラッパーに適用する追加のスタイル
 * @param props - ラッパーViewに渡す追加のプロパティ
 * @returns JSX.Element - ジョイスティックコンポーネント
 */
export const ReactNativeJoystick = ({
	onStart,
	onMove,
	onStop,
	color = '#000000',
	radius = 150,
	style,
	...props
}: IReactNativeJoystickProps) => {
	// ラッパーとニップルの寸法を計算
	const wrapperRadius = radius;
	const nippleRadius = wrapperRadius / 3;

	// ニップルの位置を追跡するためのstate (x, y座標)
	const [x, setX] = useState(wrapperRadius - nippleRadius);
	const [y, setY] = useState(wrapperRadius - nippleRadius);

	/**
	 * ジョイスティックのタッチ移動イベントを処理する
	 * 指の動きに基づいて位置、角度、力を計算する
	 */
	const handleTouchMove = useCallback(
		(event: GestureTouchEvent) => {
			const e = event.changedTouches[0];
			const fingerX = e.x;
			// Y座標のプラットフォーム差異をユーティリティで正規化
			const fingerY = utils.normalizeTouchYForPlatform(e.y, wrapperRadius, Platform.OS);

			// ニップル位置に対する初期座標を計算
			let coordinates = {
				x: fingerX - nippleRadius,
				y: fingerY - nippleRadius,
			};

			// 指の位置とジョイスティック中心間の角度を計算
			const angle = utils.calcAngle(
				{ x: fingerX, y: fingerY },
				{ x: wrapperRadius, y: wrapperRadius },
			);

			// 中心からの距離を計算
			let dist = utils.calcDistance(
				{ x: wrapperRadius, y: wrapperRadius },
				{ x: fingerX, y: fingerY },
			);

			// 距離とニップル直径の比率として力を計算
			const force = dist / (nippleRadius * 2);

			// ラッパーの境界内に移動を制限
			dist = Math.min(dist, wrapperRadius);
			if (dist === wrapperRadius) {
				// 境界にある場合、エッジ上の位置を計算
				coordinates = utils.findCoord({ x: wrapperRadius, y: wrapperRadius }, dist, angle);
				coordinates = {
					x: coordinates.x - nippleRadius,
					y: coordinates.y - nippleRadius,
				};
			}

			// ニップルの位置を更新
			setX(coordinates.x);
			setY(coordinates.y);

			// 計算された値でonMoveコールバックを実行
			onMove &&
				onMove({
					position: coordinates,
					angle: {
						radian: utils.degreesToRadians(angle),
						degree: angle,
					},
					force,
					type: 'move',
				});
		},
		[nippleRadius, wrapperRadius, onMove],
	);

	/**
	 * タッチ終了イベントを処理する
	 * ニップルを中央位置にリセットし、onStopコールバックを実行する
	 */
	const handleTouchEnd = useCallback(() => {
		// ニップルを中央位置にリセット
		setX(wrapperRadius - nippleRadius);
		setY(wrapperRadius - nippleRadius);

		// リセット値でonStopコールバックを実行
		onStop &&
			onStop({
				force: 0,
				position: {
					x: 0,
					y: 0,
				},
				angle: {
					radian: 0,
					degree: 0,
				},
				type: 'stop',
			});
	}, [wrapperRadius, nippleRadius, onStop]);

	/**
	 * タッチ開始イベントを処理する
	 * 初期値でonStartコールバックを実行する
	 */
	const handleTouchStart = useCallback(() => {
		// 初期値でonStartコールバックを実行
		onStart &&
			onStart({
				force: 0,
				position: {
					x: 0,
					y: 0,
				},
				angle: {
					radian: 0,
					degree: 0,
				},
				type: 'start',
			});
	}, [onStart]);

	// イベントハンドラーでパンジェスチャーを設定
	const panGesture = Gesture.Pan()
		.onStart(handleTouchStart)
		.onEnd(handleTouchEnd)
		.onTouchesMove(handleTouchMove)
		.runOnJS(true);

	// 再レンダリングを最適化するためのメモ化されたスタイル
	const styles = useMemo(
		() =>
			StyleSheet.create({
				wrapper: {
					width: 2 * radius,
					height: 2 * radius,
					borderRadius: radius,
					// backgroundColor: `${color}55`, // 半透明の背景
					backgroundColor: 'white', // 半透明の背景
					transform: [{ rotateX: '180deg' }], // 期待される動作に合わせて反転
					...(style && typeof style === 'object' ? style : {}),
				},
				nipple: {
					height: 2 * nippleRadius,
					width: 2 * nippleRadius,
					borderRadius: nippleRadius,
					backgroundColor: `${color}bb`, // ラッパーよりも不透明
					position: 'absolute',
					transform: [
						{
							translateX: x, // 動的なX位置
						},
						{ translateY: y }, // 動的なY位置
					],
				},
			}),
		[radius, color, nippleRadius, x, y],
	);

	// ジョイスティックコンポーネントをレンダリング
	return (
		<GestureDetector gesture={panGesture}>
			<View style={styles.wrapper} {...props}>
				<View pointerEvents="none" style={styles.nipple} />
			</View>
		</GestureDetector>
	);
};

export type { IReactNativeJoystickEvent, IReactNativeJoystickProps } from './types';
