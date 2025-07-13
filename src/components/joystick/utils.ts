/**
 * 2点間のユークリッド距離を計算する
 * @param p1 - xとy座標を持つ最初の点
 * @param p2 - xとy座標を持つ2番目の点
 * @returns 2点間の距離
 */
export const calcDistance = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) => {
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
export const calcAngle = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) => {
  // 座標の差を計算
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  // atan2を使用して生の角度を計算し、度に変換
  const rawAngle = radiansToDegrees(Math.atan2(dy, dx));
  
  // 角度を0-360度の範囲に正規化
  if (rawAngle < 0) return 180 - Math.abs(rawAngle);
  else return rawAngle + 180;
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
export const findCoord = (
  position: { x: number; y: number },
  distance: number,
  angle: number
) => {
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
