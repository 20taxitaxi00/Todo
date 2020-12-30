// チェックマークとゴミ箱のアイコン
let doneIcon = '<i class="fas fa-check fa-2x"></i>';
let removeIcon = '<i class="far fa-trash-alt fa-2x"></i>';
let data;

// もしデータが保存されていれば
if(localStorage.getItem('todoList')) {
    data = JSON.parse(localStorage.getItem('todoList'));

    renderTodoList();

// もしデータが保存されていなければ
} else {
    data = {
        task: [],
        done: []
    };
}

document.getElementById('add').addEventListener('click', function() {
    let value = document.getElementById('input').value;

    addTask(value);
});

// localStorage.clear();
console.log(localStorage);
console.log(data);



// ーーーーーー　関数　ーーーーー
function addTask(value) {
    addTaskToDOM(value);
    document.getElementById('input').value = '';
    data.task.push(value);
    dataObjectUpdated();
}

function addTaskToDOM(text, isDone) {
    let list;
    if(isDone) {
        list = document.getElementById('done');
    } else {
        list = document.getElementById('not-yet');
    }

    let task = document.createElement('li');
    task.textContent = text;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    // 完了ボタンの作成
    let done = document.createElement('button');
    done.classList.add('done');
    done.innerHTML = doneIcon;
    // 完了ボタンクリックの処理
    done.addEventListener('click', doneTask);

    // 削除ボタンの作成
    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeIcon;
    // 削除ボタンクリックの処理
    remove.addEventListener('click', removeTask);

    // DOMの組み立て
    buttons.appendChild(done);
    buttons.appendChild(remove);
    task.appendChild(buttons);

    // 組み立てたDOMをインサート
    list.insertBefore(task, list.childNodes[0]);
}

// 完了ボタン関数
function doneTask() {
    let task = this.parentNode.parentNode;
    let id = task.parentNode.id;
    if (id !== 'not-yet'){
        return;
    }

    let value = task.textContent;

    // 完了一覧に追加
    let target = document.getElementById('done');
    target.insertBefore(task, target.childNodes[0]);

    // ストレージ更新
    data.task.splice(data.task.indexOf(value), 1);
    data.done.push(value);
    dataObjectUpdated();
}

// 削除ボタン関数
function removeTask() {
    let task = this.parentNode.parentNode;
    let id = task.parentNode.id;
    let value = task.textContent;

    // 画面から削除
    task.remove();

    // ストレージから削除
    if(id === 'not-yet') {
        data.task.splice(data.task.indexOf(value), 1);
    } else {
        data.task.splice(data.done.indexOf(value), 1);
    }
    dataObjectUpdated();
}

function dataObjectUpdated() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

// 未完了タスクを一覧で表示
function renderTodoList() {
    for (let value of data.task) {
        addTaskToDOM(value);
    }

    for (let value of data.done) {
        addTaskToDOM(value, true);
    }
}