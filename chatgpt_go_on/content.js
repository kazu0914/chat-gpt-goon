
// サンプルボタンを作成
const sampleButton = document.createElement('button');
sampleButton.innerText = 'Go on';
sampleButton.classList.add('go-on-button');

// サンプルボタンをページに追加
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
// ボタンをチャット入力欄の右上に表示
const chatInputArea = document.querySelector('textarea');
const chatInputWrapper = chatInputArea.parentElement;
chatInputWrapper.style.position = 'relative';
chatInputWrapper.appendChild(sampleButton);