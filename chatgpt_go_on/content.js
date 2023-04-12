// サンプルボタンを作成
const sampleButton = document.createElement('button');
sampleButton.innerText = 'Go on';
sampleButton.classList.add('go-on-button');

// サンプルボタンをChatGPTの画面に追加し表示
document.body.appendChild(sampleButton);

sampleButton.addEventListener('click', () => {
  const xpath = '//*[@id="__next"]/div[2]/div[2]/main/div[2]/form/div/div[2]/textarea';
  const iterator = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
  const textarea = iterator.iterateNext();

  if (textarea) {
    textarea.value = 'go on';
  } else {
    console.log('Textarea not found...');
  }
});

// ボタンをチャット入力欄の右上に表示する関数
function addButton() {
  const chatInputArea = document.querySelector('textarea');
  if (chatInputArea) {
    const chatInputWrapper = chatInputArea.parentElement;
    chatInputWrapper.style.position = 'relative';
    chatInputWrapper.appendChild(sampleButton);
  }
}

// ページが読み込まれた時にボタンを追加
addButton();

// ページの変更を監視して新しいチャットエリアが表示された場合にボタンを追加
const observer = new MutationObserver(() => {
  if (!document.contains(sampleButton)) {
    addButton();
  }
});

observer.observe(document.body, { childList: true, subtree: true });