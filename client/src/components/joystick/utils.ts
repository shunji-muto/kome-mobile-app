/**
 * 2点間のユークリッド距離を計算する
 * @param p1 - xとy座標を持つ最初の点
 * @param p2 - xとy座標を持つ2番目の点
 * @returns 2点間の距離
 */
export const calcDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
	// xとy座標の差を計算
	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;

	// ピタゴラスの定理を使用して距離を計算
	return Math.sqrt(dx * dx + dy * dy);
};

/**
 * 2点間の角度を度で計算する
 * @param p1 - 最初の点（通常は指/タッチ位置）
 * @param p2 - 2番目の点（通常はジョイスティック中心）
 * @returns 角度（度単位、0-360の範囲）
 */
export const calcAngle = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
	// 座標の差を計算
	const dx = p2.x - p1.x;
	const dy = p2.y - p1.y;

	// atan2を使用して生の角度を計算し、度に変換
	const rawAngle = radiansToDegrees(Math.atan2(dy, dx));

	// 角度を0-360度の範囲に正規化
	return rawAngle < 0 ? rawAngle + 360 : rawAngle;
};

/**
 * 度をラジアンに変換する
 * @param a - 度単位の角度
 * @returns ラジアン単位の角度
 */
export const degreesToRadians = (a: number) => {
	return a * (Math.PI / 180);
};

/**
 * ラジアンを度に変換する
 * @param a - ラジアン単位の角度
 * @returns 度単位の角度
 */
export const radiansToDegrees = (a: number) => {
	return a * (180 / Math.PI);
};

/**
 * 指定された位置から特定の距離と角度にある座標を見つける
 * 境界に制限されたジョイスティックニップルの位置を計算するために使用
 * @param position - 開始位置（通常はジョイスティック中心）
 * @param distance - 開始位置からの距離
 * @param angle - 度単位の角度
 * @returns 指定された距離と角度での新しい座標
 */
export const findCoord = (position: { x: number; y: number }, distance: number, angle: number) => {
	const b = { x: 0, y: 0 };

	// 三角関数計算のために角度をラジアンに変換
	angle = degreesToRadians(angle);

	// 三角関数を使用して新しい位置を計算
	b.x = position.x + distance * Math.cos(angle);
	b.y = position.y + distance * Math.sin(angle);

	// 負のY値のエッジケースを処理（プラットフォーム固有の調整）
	if (b.y < 0) b.y += 150;

	return b;
};

/**
 * プラットフォームごとにタッチY座標を正規化するユーティリティ
 *
 * React NativeのWebプラットフォームでは、タッチイベントのY座標系が
 * ネイティブと異なり、原点が下部にあるため、上下が反転している。
 * そのため、WebではY座標を `2 * wrapperRadius - y` で反転させる必要がある。
 * この関数はその差異を吸収し、全プラットフォームで一貫したY座標を返す。
 *
 * @param y - タッチイベントから取得した生のY座標
 * @param wrapperRadius - ジョイスティックラッパーの半径
 * @param platform - Platform.OSの値（'web'または'ios'/'android'など）
 * @returns 正規化されたY座標
 */
export const normalizeTouchYForPlatform = (
	y: number,
	wrapperRadius: number,
	platform: string,
): number => {
	// WebではY座標が上下逆なので反転する
	if (platform === 'web') {
		// Expo/React Native Webの仕様でY軸が下から上に増加するため
		// ラッパーの直径から引くことでネイティブと同じ向きに揃える
		return wrapperRadius * 2 - y;
	}
	// ネイティブ（iOS/Android）はそのまま
	return y;
};
