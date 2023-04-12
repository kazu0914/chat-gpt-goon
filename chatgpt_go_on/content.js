// default で GPT-4モデルを選択する関数
const redirectToGPT4 = () => {
  if (window.location.href === 'https://chat.openai.com/chat') {
    window.location.href = 'https://chat.openai.com/chat?model=gpt-4';
  }
};

// 最初のページのロード時にリダイレクトを実行
redirectToGPT4();

// ページ内での URL 変更を監視してリダイレクトを実行
const pushStateOriginal = history.pushState;
history.pushState = function () {
  pushStateOriginal.apply(this, arguments);
  redirectToGPT4();
};

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

// 新しいチャットが作成されたときに GPT-4 を選択する
const redirectWithGPT4 = (button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'https://chat.openai.com/chat?model=gpt-4';
  });
};

const newChatObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList') {
      const newChatButtonXPath = '//*[@id="__next"]/div[2]/div[1]/div/div/nav/a[1]';
      const newChatButtonIterator = document.evaluate(newChatButtonXPath, document, null, XPathResult.ANY_TYPE, null);
      const newChatButton = newChatButtonIterator.iterateNext();
      
      if (newChatButton) {
        redirectWithGPT4(newChatButton);
      }
    }
  });
});

newChatObserver.observe(document.body, {
  childList: true,
  subtree: true,
});