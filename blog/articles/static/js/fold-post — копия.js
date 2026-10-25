var foldBtns = document.getElementsByClassName("fold-button");

for (var i = 0; i < foldBtns.length; i++) {
    foldBtns[i].addEventListener("click", function(e) {
        var displayState;

        if (e.target.className == "fold-button folded") {
            // статья свёрнута → разворачиваем
            e.target.innerHTML = "свернуть";
            e.target.className = "fold-button";
            displayState = "block";
        } else {
            // статья развёрнута → сворачиваем
            e.target.innerHTML = "развернуть";
            e.target.className = "fold-button folded";
            displayState = "none";
        }

        // скрываем/показываем автора
        e.target
            .parentElement
            .getElementsByClassName('article-author')[0]
            .style.display = displayState;

        // скрываем/показываем дату
        e.target
            .parentElement
            .getElementsByClassName('article-created-date')[0]
            .style.display = displayState;

        // скрываем/показываем текст
        e.target
            .parentElement
            .getElementsByClassName('article-text')[0]
            .style.display = displayState;
    });
}