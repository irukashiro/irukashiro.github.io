// プレイヤーの初期ステータス
let player = {
    hp: 100,
    attack: 10,
    accuracy: 75,
    agility: 50,
    level: 1,
    experience: 0
};

// ゲームの状態
let gameState = {
    currentEvent: "探索イベント",
    log: [],
    actionCount: 0,
    bossEncounter: false
};

// ゲーム開始
function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    updateStatus();
}

// プレイヤーのステータスを更新
function updateStatus() {
    document.getElementById('player-hp').innerText = player.hp;
    document.getElementById('player-attack').innerText = player.attack;
    document.getElementById('player-accuracy').innerText = player.accuracy + '%';
    document.getElementById('player-agility').innerText = player.agility;
    document.getElementById('player-level').innerText = player.level;
    document.getElementById('player-exp').innerText = player.experience;
}

// イベントを解決
function resolveEvent() {
    let action = document.getElementById('player-action').value;
    gameState.log.push("【" + gameState.currentEvent + "】プレイヤーは「" + action + "」を選択しました。");

    if (gameState.currentEvent === "探索イベント") {
        exploreEvent(action);
    } else if (gameState.currentEvent === "戦闘イベント") {
        battleEvent(action);
    }

    updateLog();
    updateStatus();
}

// 探索イベントを実行
function exploreEvent(action) {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    if (diceRoll <= 3) {
        gameState.log.push("探索中に何も特別なものは見つかりませんでした。");
    } else if (diceRoll <= 5) {
        let experienceGain = Math.floor(Math.random() * 10) + 1;
        player.experience += experienceGain;
        gameState.log.push("宝箱を見つけました！経験値を" + experienceGain + "獲得しました。");
        if (player.experience >= player.level * 10) {
            player.level++;
            player.attack += 5;
            player.accuracy += 5;
            player.agility += 5;
            player.hp += 20;
            gameState.log.push("レベルアップ！ステータスが上がりました。");
        }
    } else {
        let enemyHP = Math.floor(Math.random() * 50) + 50;
        let enemyAttack = Math.floor(Math.random() * 10) + 5;
        let enemyAccuracy = Math.floor(Math.random() * 30) + 70;
        gameState.log.push("敵が現れました！");

        gameState.currentEvent = "戦闘イベント";
        gameState.enemy = {
            hp: enemyHP,
            attack: enemyAttack,
            accuracy: enemyAccuracy
        };

        gameState.log.push("【戦闘イベント】プレイヤーは攻撃、回避、逃走の選択肢があります。");
        enemyAction(); // 敵の行動
    }
}

// 敵の行動
function enemyAction() {
    let enemyDice = Math.floor(Math.random() * 3);
    if (enemyDice === 0) {
        gameState.log.push("敵の攻撃！ ");
        let diceRoll = Math.floor(Math.random() * 100) + 1;
        if (diceRoll <= gameState.enemy.accuracy) {
            let damage = gameState.enemy.attack;
            player.hp -= damage;
            gameState.log.push("プレイヤーは敵の攻撃を受けて" + damage + "のダメージを受けました！");
            if (player.hp <= 0) {
                gameState.log.push("プレイヤーは戦闘に敗北しました！ゲームオーバー！");
                gameOver();
                return;
            }
        } else {
            gameState.log.push("プレイヤーは敵の攻撃を回避しました！");
        }
    } else {
        gameState.log.push("敵は行動しませんでした。");
    }
}

// 戦闘イベントを実行
function battleEvent(action) {
    if (gameState.enemy.hp <= 0) {
        gameState.log.push("敵を倒しました！");
        gameState.currentEvent = "探索イベント";
        delete gameState.enemy;
        gameState.actionCount = 0; // 行動回数リセット
        updateStatus();
        return;
    }

    gameState.actionCount++; // 行動回数カウント

    if (gameState.actionCount >= 5 && gameState.actionCount <= 10 && !gameState.bossEncounter) {
        gameState.bossEncounter = true;
        gameState.enemy = {
            hp: 150, // ボスのHP
            attack: 15, // ボスの攻撃力
            accuracy: 80 // ボスの命中率
        };
        gameState.log.push("ボスが現れました！");        
        gameState.currentEvent = "戦闘イベント";
        gameState.log.push("【戦闘イベント】プレイヤーは攻撃、回避、逃走の選択肢があります。");
        enemyAction(); // ボスの行動
        return;
    }

    if (action === "攻撃") {
        let diceRoll = Math.floor(Math.random() * 100) + 1;
        if (diceRoll <= player.accuracy) {
            let damage = player.attack;
            gameState.enemy.hp -= damage;
            gameState.log.push("プレイヤーの攻撃！ 敵に" + damage + "のダメージ！");
        } else {
            gameState.log.push("プレイヤーの攻撃！しかし、攻撃が外れました！");
        }
    } else if (action === "回避") {
        let diceRoll = Math.floor(Math.random() * 100) + 1;
        if (diceRoll <= player.agility) {
            gameState.log.push("プレイヤーの回避！ 敵の攻撃を回避しました！");
        } else {
            let damage = gameState.enemy.attack;
            player.hp -= damage;
            gameState.log.push("プレイヤーは敵の攻撃を受けて" + damage + "のダメージを受けました！");
            if (player.hp <= 0) {
                gameState.log.push("プレイヤーは戦闘に敗北しました！ゲームオーバー！");
                gameOver();
                return;
            }
        }
    } else if (action === "逃走") {
        let diceRoll = Math.floor(Math.random() * 100) + 1;
        if (diceRoll <= player.agility) {
            gameState.log.push("プレイヤーは逃走に成功しました！");
            gameState.currentEvent = "探索イベント";
            delete gameState.enemy;
            gameState.actionCount = 0; // 行動回数リセット
            updateStatus();
            return;
        } else {
            gameState.log.push("プレイヤーは逃走に失敗しました！");
        }
    }

    enemyAction(); // 敵の行動
    updateStatus();
}

// ゲームオーバー処理
function gameOver() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('title-screen').style.display = 'block';
    // ゲームオーバー時の追加処理をここに記述することも可能
}

// 戦闘ログを更新
function updateLog() {
    let logList = document.getElementById('log-list');
    logList.innerHTML = "";
    gameState.log.forEach(function (log) {
        let li = document.createElement("li");
        li.innerText = log;
        logList.appendChild(li);
    });
}
