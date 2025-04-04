
# Guia de Implantação do Aplicativo Móvel

Este guia explica como implantar o AssistAnywhere como um aplicativo móvel para Android e iOS.

## Requisitos

### Para Android:
- [Android Studio](https://developer.android.com/studio)
- JDK 11 ou superior

### Para iOS:
- Mac com macOS
- [Xcode](https://apps.apple.com/us/app/xcode/id497799835)
- CocoaPods (`sudo gem install cocoapods`)

## Passos para Implantação

### 1. Preparação inicial
Clone o repositório e instale as dependências:
```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DA_PASTA>
npm install
```

### 2. Construa o aplicativo web
```bash
npm run build
```

### 3. Sincronize o código com as plataformas nativas
```bash
npx cap sync
```

### 4. Android: Abra o projeto no Android Studio
```bash
npx cap open android
```
No Android Studio, você pode:
- Testar o aplicativo em um emulador: Selecione um emulador e clique em "Run"
- Compilar um APK para distribuição: Build > Build Bundle(s) / APK(s) > Build APK(s)
- Para distribuição na Play Store: Build > Generate Signed Bundle / APK

### 5. iOS: Abra o projeto no Xcode
```bash
npx cap open ios
```
No Xcode, você pode:
- Testar o aplicativo em um simulador: Selecione um simulador e clique em "Run"
- Testar em um dispositivo físico: Conecte o dispositivo, selecione-o e clique em "Run"
- Para distribuição na App Store: Product > Archive

## Executar em dispositivos conectados
```bash
# Para Android
npx cap run android

# Para iOS
npx cap run ios
```

## Resolução de problemas comuns

### O aplicativo não carrega
Verifique se a URL no arquivo `capacitor.config.ts` está correta e acessível.

### Erros de compilação no Android
Certifique-se de ter o SDK do Android atualizado e o JDK 11 ou superior.

### Erros de compilação no iOS
Verifique se você tem as versões mais recentes do Xcode e CocoaPods.

### Certificados e assinatura
Para distribuição oficial, você precisará:
- Android: Um arquivo keystore para assinar seu APK
- iOS: Uma conta de desenvolvedor Apple e certificados de distribuição
