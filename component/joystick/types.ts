import { ViewProps } from "react-native";

/**
 * ジョイスティックイベントデータのインターフェース
 * 操作中のジョイスティックの状態に関する情報を含む
 */
export interface IReactNativeJoystickEvent {
  /** イベントの種類 - start、move、またはstop */
  type: "move" | "stop" | "start";
  /** ジョイスティック中心に対する相対位置座標 */
  position: {
    /** X座標 */
    x: number;
    /** Y座標 */
    y: number;
  };
  /** 中心からの距離を表す力の値（0-1の範囲） */
  force: number;
  /** ジョイスティックの方向に関する角度情報 */
  angle: {
    /** ラジアン単位の角度 */
    radian: number;
    /** 度単位の角度 */
    degree: number;
  };
}

/**
 * ReactNativeJoystickコンポーネントのプロパティインターフェース
 * 標準的なReact Native Viewプロパティを許可するためViewPropsを拡張
 */
export interface IReactNativeJoystickProps extends ViewProps {
  /** ジョイスティックの操作が開始されたときに呼び出されるコールバック関数 */
  onStart?: (e: IReactNativeJoystickEvent) => void;
  /** ジョイスティックが移動したときに呼び出されるコールバック関数 */
  onMove?: (e: IReactNativeJoystickEvent) => void;
  /** ジョイスティックの操作が停止したときに呼び出されるコールバック関数 */
  onStop?: (e: IReactNativeJoystickEvent) => void;
  /** ジョイスティックラッパーの半径（ピクセル単位、デフォルト: 150） */
  radius?: number;
  /** ジョイスティック要素の色（デフォルト: '#000000'） */
  color?: string;
}
