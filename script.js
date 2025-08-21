// DOM要素の取得
const userGuessInput = document.getElementById('user-guess');
const checkButton = document.getElementById('check-button');
const logsList = document.getElementById('logs');
const messageEl = document.getElementById('message');

// --- ゲームの変数 ---
let answer; // 答えの数字
let attempts; // 試行回数
let isGameOver; // ゲームオーバーフラグ

// --- ゲームの初期化 ---
function initGame() {
    // 答えを生成
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    answer = '';
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        answer += numbers.splice(randomIndex, 1)[0];
    }
    
    // 変数をリセット
    attempts = 0;
    isGameOver = false;

    // 表示をリセット
    logsList.innerHTML = '';
    messageEl.textContent = '';
    userGuessInput.value = '';
    userGuessInput.disabled = false;
    checkButton.disabled = false;

    console.log('答え:', answer); // デバッグ用に答えをコンソールに出力
}

// --- チェックボタンが押されたときの処理 ---
checkButton.addEventListener('click', () => {
    const guess = userGuessInput.value;

    // --- 入力値のバリデーション（チェック） ---
    // 1. 3桁か？
    if (guess.length !== 3) {
        alert('3桁の数字を入力してください。');
        return;
    }
    // 2. 数字か？
    if (isNaN(guess)) {
        alert('数字を入力してください。');
        return;
    }
    // 3. 重複はないか？ (Setを使って重複を除いたサイズを比較)
    const uniqueDigits = new Set(guess.split(''));
    if (uniqueDigits.size !== 3) {
        alert('重複しない数字を入力してください。');
        return;
    }

    // --- ヒットとブローの判定 ---
    let hit = 0;
    let blow = 0;

    for (let i = 0; i < 3; i++) {
        // 同じ場所に同じ数字があるか (ヒット)
        if (guess[i] === answer[i]) {
            hit++;
        } 
        // 違う場所に同じ数字があるか (ブロー)
        else if (answer.includes(guess[i])) {
            blow++;
        }
    }
    
    // 試行回数を増やす
    attempts++;
    
    // --- 結果の表示 ---
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="guess">${attempts}: ${guess}</span>
        <span class="result">${hit}H ${blow}B</span>
    `;
    logsList.prepend(li); // 新しい結果を上に追加

    // 正解の場合
    if (hit === 3) {
        isGameOver = true;
        messageEl.textContent = `${attempts}回で正解！🎉 おめでとう！`;
        // 入力できないようにする
        userGuessInput.disabled = true;
        checkButton.disabled = true;
    }
    
    // 入力欄を空にする
    userGuessInput.value = '';
});

// --- Enterキーでもチェックできるようにする ---
userGuessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkButton.click();
    }
});


// --- ゲーム開始 ---
initGame();