const queryString = location.search
const queryBox = new URLSearchParams(queryString)
const diaryNum = queryBox.get("number")

const diary = JSON.parse(localStorage.getItem("diaryArray"))[diaryNum];
console.log(diary)

document.getElementById("container_diary").innerHTML = `
    <div class="diary_title">
        <h1>${diary.title}</h1>
    </div>
    <div class="diary_second_line">
        <div class="emotion">
            <img class="emotion_img" src="./assets/img/emotion/${diary.emotion}_s.png" alt="" />
            <div class="emotion_name" style="color: ${diary.emotionFontColor};">${diary.emotionName}</div>
    </div>
        <div class="diary_date">${diary.formattedDate} 작성</div>
    </div>
    <div class="diary_contents">
        <h1>내용</h1>
        <div class="contents_read">${diary.contents}</div>
    </div>
    <div class="diary_buttons">
         <a href="./main.html"><button class="diary_back">뒤로가기</button><a />
        <button class="diary_modify">수정하기</button>
    </div>
`