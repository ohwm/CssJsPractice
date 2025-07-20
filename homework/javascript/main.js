window.onload = () => {
    const diary = JSON.parse(localStorage.getItem("diaryArray"))
    const diaryLiberary = diary === null ? [] : diary
    loadDiary(diary)
}

const uploadDiary = () => {
    const diaryLocal = JSON.parse(localStorage.getItem("diaryArray"))
    const diaryLiberary = diaryLocal === null ? [] : diaryLocal

    let diaryCnt = diaryLiberary.length;
    console.log(diaryCnt)

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}. ${month}. ${day}`;

    const title = document.getElementById("title_value").value
    const contents = document.getElementById("contents_value").value
    const emotion = document.querySelector('input[name="emoge"]:checked').value;
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

    const diary = {
        formattedDate,
        title,
        contents,
        emotion,
        emotionName,
        emotionFontColor,
        diaryCnt
    }
    diaryLiberary.push(diary)
    localStorage.setItem("diaryArray", JSON.stringify(diaryLiberary));

    loadDiary()
}

const filteringDiary = (event) => {
    const emotionValue = event.target.value
    const diaryArray = JSON.parse(localStorage.getItem("diaryArray"));
    let filteredDiary = emotionValue !== "all" ? diaryArray.filter((el) => el.emotion === emotionValue) : diaryArray

    loadDiary(filteredDiary)
}

const loadDiary = (diary) => {
    console.log(diary)
    // map과 join에서 오류가 생김
    const diaryTag = diary !== null ? diary.map((el) => `
        <a href="./detail.html?number=${el.diaryCnt}">
            <div class="diary_container">
                <img src="./assets/img/emotion/${el.emotion}.png" alt="">
                <div class="diary_down">
                    <div class="diary_first_line">
                        <div class="emotion_name" style="color: ${el.emotionFontColor};">${el.emotionName}</div>
                        <div class="diary_date">${el.formattedDate}</div>
                    </div>
                    <div class="diary_title">${el.title}</div>
                </div>
            </div>
        <a />
    `) : null;

    if(diary !== null)
        document.getElementById("table_items").innerHTML = diaryTag.join("")
}