const diaryLiberary = []

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

    let emotionName
    switch (emotion) {
        case 'happy':
            emotionName = "행복해요"
        case 'sad':
            emotionName = "슬퍼요"
        case 'suprised':
            emotionName = "놀랐어요"
        case 'angry':
            emotionName = "화나요"
        case 'extra':
            emotionName = "기타"
    }

    const newDiaryConstructor = `
        <div class="diary_container">
            <img src="./assets/img/emotion/${emotion}.png" alt="">
            <div class="diary_first_line">
               <div class="emotion_name">${emotionName}</div>
                <div class="diary_date">${formattedDate}</div>
            </div>
            <div class="diary_title">${title}</div>
        </div>
    `
    console.log(newDiaryConstructor)

    document.getElementById("table_itmes").innerHTML = currentDiary + newDiaryConstructor
}