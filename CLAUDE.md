# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを操作する際のガイダンスを提供します。

## プロジェクト概要

これはExpo SDK 53で構築されたReact Nativeモバイルアプリケーションです。プロジェクトは現在開発初期段階で、基本的なスターターテンプレート構造と、カスタムジョイスティックコンポーネントを含んでいます。

## 開発コマンド

- `npm start` - Expo開発サーバーを起動
- `npm run android` - Androidシミュレーター/デバイスでアプリを起動
- `npm run ios` - iOSシミュレーター/デバイスでアプリを起動
- `npm run web` - Webブラウザでアプリを起動

## アーキテクチャ

- **エントリーポイント**: `index.ts` がExpoの `registerRootComponent` を使用してルートコンポーネントを登録
- **メインコンポーネント**: `App.tsx` が基本的なReact Native構造を持つメインアプリケーションコンポーネントを含む
- **設定ファイル**: 
  - `app.json` - アプリのメタデータとビルド設定を含むExpo設定
  - `tsconfig.json` - 厳密モードを有効にしたExpoのベース設定を拡張するTypeScript設定
  - New Architectureが有効 (`app.json` 内の `newArchEnabled: true`)

## 技術スタック

- **フレームワーク**: React Native 0.79.4 with React 19.0.0
- **開発プラットフォーム**: Expo ~53.0.12
- **言語**: TypeScript（厳密モード）
- **UI**: React Nativeコンポーネント + StyleSheet
- **ジェスチャー処理**: react-native-gesture-handler

## プロジェクト構造

- ルートレベルアプリ（メインファイルはプロジェクトルートに配置）
- `assets/` ディレクトリにアプリアイコンとスプラッシュスクリーンを格納
- `component/joystick/` ディレクトリにカスタムジョイスティックコンポーネントを格納
- 現在 `App.tsx` コンポーネントはプレースホルダーテキストを表示
- 最小限のカスタマイズによる標準的なExpoプロジェクト構造

## コンポーネント

### ジョイスティックコンポーネント (`component/joystick/`)

カスタマイズ可能なジョイスティックコンポーネントが実装されています：

- **joy-stick.tsx** - メインのジョイスティックコンポーネント
  - React Native Gesture Handlerを使用したタッチ操作
  - カスタマイズ可能な色とサイズ
  - リアルタイムの位置、角度、力の計算
  - onStart、onMove、onStopコールバック対応

- **types.ts** - TypeScriptインターフェース定義
  - `IReactNativeJoystickEvent` - イベントデータの構造
  - `IReactNativeJoystickProps` - コンポーネントプロパティの構造

- **utils.ts** - 数学計算ユーティリティ関数
  - 距離計算（ユークリッド距離）
  - 角度計算（度/ラジアン変換）
  - 座標計算（三角関数）

### 使用例

```typescript
import { ReactNativeJoystick } from './component/joystick/joy-stick';

<ReactNativeJoystick
  radius={100}
  color="#0066CC"
  onMove={(event) => {
    console.log('Position:', event.position);
    console.log('Angle:', event.angle.degree);
    console.log('Force:', event.force);
  }}
  onStart={(event) => console.log('Started')}
  onStop={(event) => console.log('Stopped')}
/>
```

## 開発ガイドライン

- TypeScriptの厳密モードを使用
- コンポーネントは日本語でコメント化
- プラットフォーム固有の調整に注意（特にWeb対応）
- ジェスチャー処理にはreact-native-gesture-handlerを使用