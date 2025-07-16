const diaryLiberary = []
let diaryCnt = -1;

const uploadDiary = () => {
    const currentDiary = document.getElementById("table_items").innerHTML

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}. ${month}. ${day}`;

    const title = document.getElementById("title_value").value
    const contents = document.getElementById("contents_value").value
    const emotion = document.querySelector('input[name="emoge"]:checked').value;
    const diary = {
        formattedDate,
        title,
        contents,
        emotion
    }
    diaryLiberary.push(diary)
    diaryCnt += 1

    let emotionName
    let emotionFontColor
    switch (emotion) {
        case 'happy':
            emotionName = "행복해요"
            emotionFontColor = "#EA5757"
            break;
        case 'sad':
            emotionName = "슬퍼요"
            emotionFontColor = "#28B4E1"
            break;
        case 'suprised':
            emotionName = "놀랐어요"
            emotionFontColor = "#D59029"
            break;
        case 'angry':
            emotionName = "화나요"
            emotionFontColor = "#777777"
            break;
        case 'extra':
            emotionName = "기타"
            emotionFontColor = "#A229ED"
    }

    const newDiaryConstructor = `
        <div class="diary_container" onclick="diaryContentsOpen(${diaryCnt})">
            <img src="./assets/img/emotion/${emotion}.png" alt="">
            <div class="diary_down">
                <div class="diary_first_line">
                    <div class="emotion_name" style="color: ${emotionFontColor};">${emotionName}</div>
                    <div class="diary_date">${formattedDate}</div>
                </div>
                <div class="diary_title">${title}</div>
            </div>
        </div>
    `
    console.log(newDiaryConstructor)

    document.getElementById("table_items").innerHTML = currentDiary + newDiaryConstructor
}

const diaryContentsOpen = (Cnt) => {
    const diaryTitle = diaryLiberary[Cnt].title
    const diaryContents = diaryLiberary[Cnt].contents

    alert(`
        제목: ${diaryTitle}
        내용: ${diaryContents}
    `)
}