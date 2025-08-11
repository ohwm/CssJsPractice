window.onload = () => {
    const diary = JSON.parse(localStorage.getItem("diaryArray"))
    const diaryLiberary = diary === null ? [] : diary
    loadDiary(diary)
}


window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        document.getElementById("emotion_filter").style = "background-color: black; color: white;"
    } else {
        document.getElementById("emotion_filter").style = "background-color: white; color: black;"
    }

    const footer = document.getElementById("footer")
    const floatingBtn = document.getElementById("floating_button")

    const footerRect = footer.getBoundingClientRect();
    const btnHeight = floatingBtn.offsetHeight;
    const gap = 0; // 버튼과 푸터 사이 간격 여유

    const overlap = (window.innerHeight - footerRect.top);

    floatingBtn.style.position = "fixed";
    floatingBtn.style.right = "2.5rem";

    if (overlap > 0) {
        // 푸터와 겹칠 경우: 겹치는 만큼 위로 띄움
        floatingBtn.style.bottom = `${2.5 + (overlap + gap) / 16}rem`;
    } else {
        // 기본 위치
        floatingBtn.style.bottom = "2.5rem";
    }
})


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

    if (title === "" || contents === "" || emotion === null){
        alert("제목, 내용을 작성해주세요.")
        return;
    }

    let emotionName
    let emotionFontColor
    switch (emotion) {
        case 'happy':
            emotionName = "행복해요"
            emotionFontColor = "#EA5757"
            emotionNum = 1
            break;
        case 'sad':
            emotionName = "슬퍼요"
            emotionFontColor = "#28B4E1"
            emotionNum = 2
            break;
        case 'suprised':
            emotionName = "놀랐어요"
            emotionFontColor = "#D59029"
            emotionNum = 3
            break;
        case 'angry':
            emotionName = "화나요"
            emotionFontColor = "#777777"
            emotionNum = 4
            break;
        case 'extra':
            emotionName = "기타"
            emotionFontColor = "#A229ED"
            emotionNum = 5
    }

    const diary = {
        formattedDate,
        title,
        contents,
        emotion,
        emotionName,
        emotionFontColor,
        diaryCnt,
        diaryChat : []
    }
    diaryLiberary.push(diary)
    localStorage.setItem("diaryArray", JSON.stringify(diaryLiberary));
    openDiaryDone()
    loadDiary(diaryLiberary)
}

const filteringDiary = (event) => {
    const emotionValue = event.target.value
    const diaryArray = JSON.parse(localStorage.getItem("diaryArray"));
    let filteredDiary = emotionValue !== "all" ? diaryArray.filter((el) => el.emotion === emotionValue) : diaryArray

    loadDiary(filteredDiary)
}

const loadDiary = (diary) => {
    console.log(diary)

    const diaryTag = diary !== null ? diary.map((el) => `
        <a href="./detail.html?number=${el.diaryCnt}" class="diary_atag">
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
            <button class="diary_close_btn" onclick="delete_diary(event, ${el.diaryCnt})">
                <img src="./assets/img/lightmode_icon/close_outline_light_m.svg" />
            </button>
        </a>
    `) : null;

    if(diary !== null)
        document.getElementById("table_items").innerHTML = diaryTag.join("")
}

const openDiaryWrite = () => {
    document.body.style.overflow = "hidden"
    window.scrollTo({ top: 0})
    document.getElementById("modal_diaryplus").style.display = "block"
}

const closeModalDiaryPlus = () => {
    document.body.style.overflow = "auto"
    document.getElementById("modal_diaryplus").style.display = "none"
}

const openDiaryDone = () => {
    document.getElementById("modal_diaryDone").style.display = "block"
}

const openDiaryStop = () => {
    document.getElementById("modal_diaryStop").style.display = "block"
}

const closeDiaryStop = () => {
    document.getElementById("modal_diaryStop").style.display = "none"
}

const closeAll = () => {
    document.body.style.overflow = "auto"
    document.getElementById("modal_diaryplus").style.display = "none"
    document.getElementById("modal_diaryDone").style.display = "none"
    document.getElementById("modal_diaryStop").style.display = "none"
    document.getElementById("title_value").value = ""
    document.getElementById("contents_value").value = ""
}

const delete_diary = (event, number) => {
    event.preventDefault();
    const diaryArray = JSON.parse(localStorage.getItem("diaryArray"));
    diaryArray.splice(number, 1)

    diaryArray.map((el, index) => {
        el.diaryCnt = index;
    })

    localStorage.setItem("diaryArray", JSON.stringify(diaryArray));

    loadDiary(diaryArray)

    alert("일기가 삭제되었습니다.")
}

const floating_clicked = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
}