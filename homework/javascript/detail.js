window.onload = () => {
    getDiary()
}


// const modifyDiary = () => {
//     const queryString = location.search
//     const queryBox = new URLSearchParams(queryString)
//     const diaryNum = queryBox.get("number")

//     const diary = JSON.parse(localStorage.getItem("diaryArray"))[diaryNum];
    
//     document.getElementById("container_diary").innerHTML = `
//         <div class="modify_container">
//                 <div class="plus_writing">
//                     <div class="writing_emotion">
//                         <div class="emotion_title">오늘 기분은 어땠나요?</div>
//                         <div class="emotion_choose">
//                             <label><input value="happy" name="emoge" type="radio">행복해요</label>
//                             <label><input value="sad" name="emoge" type="radio">슬퍼요</label>
//                             <label><input value="suprised" name="emoge" type="radio">놀랐어요</label>
//                             <label><input value="angry" name="emoge" type="radio">화나요</label>
//                             <label><input value="extra" name="emoge" type="radio">기타</label>
//                         </div>
//                     </div>
//                     <div class="writing_diary">
//                         <div class="writing_title">
//                             <div>제목</div>
//                             <input id="title_value" type="text" placeholder="제목을 입력합니다.">
//                         </div>
//                         <div class="writing_contents">
//                             <div>내용</div>
//                             <textarea name="" id="contents_value"></textarea>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="diary_buttons">
//                     <button class="diary_back" onclick="getDiary()">취소</button>
//                     <button class="diary_modify" onclick="modifyDiaryConfirm()">수정하기</button>
//                 </div>
//             </div>
//     `

//     document.getElementById("title_value").value = diary.title
//     document.getElementById("contents_value").innerText = diary.contents
//     document.querySelector(`input[name="emoge"][value="${diary.emotion}"]`).checked = true;
// }

// const modifyDiaryConfirm = () => {
//     const title = document.getElementById("title_value").value
//     const contents = document.getElementById("contents_value").value
//     const emotion = document.querySelector('input[name="emoge"]:checked').value;
//     let emotionName
//     let emotionFontColor
//     switch (emotion) {
//         case 'happy':
//             emotionName = "행복해요"
//             emotionFontColor = "#EA5757"
//             break;
//         case 'sad':
//             emotionName = "슬퍼요"
//             emotionFontColor = "#28B4E1"
//             break;
//         case 'suprised':
//             emotionName = "놀랐어요"
//             emotionFontColor = "#D59029"
//             break;
//         case 'angry':
//             emotionName = "화나요"
//             emotionFontColor = "#777777"
//             break;
//         case 'extra':
//             emotionName = "기타"
//             emotionFontColor = "#A229ED"
//     }

//     const queryString = location.search;
//     const queryBox = new URLSearchParams(queryString);
//     const diaryNum = queryBox.get("number");

//     const diaryArray = JSON.parse(localStorage.getItem("diaryArray"))[diaryNum];

//     diaryArray[diaryNum] = {
//         ...diaryArray[diaryNum], // 기존 값을 유지하는 코드
//         title,
//         contents,
//         emotion,
//         emotionName,
//         emotionFontColor
//     };

//     localStorage.setItem("diaryArray", JSON.stringify(diaryArray))
//     console.log("등록되었습니다.")
//     getDiary()
// }

const getDiary = () => {
    const queryString = location.search
    const queryBox = new URLSearchParams(queryString)
    const diaryNum = queryBox.get("number")

    const diary = JSON.parse(localStorage.getItem("diaryArray"))[diaryNum];
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
        <button class="diary_modify" onclick="modifyDiary()">수정하기</button>
    </div>
    `
}