window.onload = () => {
    changeToDiaryContainer();
}

const diaryContainer = `
    <div id="container_table" class="container_table">
        <div id="table_items">
            <!-- 아이템 추가되는 곳 -->
        </div>
    </div>
`
const dogContainer = `
    <div id="container_table_dog" class="container_table_dog"></div>
`

const diaryFilter = `
    <select name="emotion" id="emotion_filter" onchange="filteringDiary(event)">
        <option value="all">전체</option>
        <option value="happy">행복해요</option>
        <option value="sad">슬퍼요</option>
        <option value="suprised">놀랐어요</option>
        <option value="angry">화나요</option>
        <option value="extra">기타</option>
    </select>
`

const dogFilter = `
    <select name="dog" id="dog_filter" onchange="filteringDog(event)">
        <option value="all">기본형</option>
        <option value="width">가로형</option>
        <option value="height">세로형</option>
    </select>
`

const changeToDiaryContainer = () => {
    document.getElementById("container_nav_diary").className = "nav_selected";
    document.getElementById("container_nav_dog").className = "nav_unselected";

    document.getElementById("filters").innerHTML = diaryFilter;
    document.getElementById("nav_diaryBtn").style.display = 'flex';

    document.getElementById("container_nav_change").innerHTML = diaryContainer;
    const diary = JSON.parse(localStorage.getItem("diaryArray"))
    const diaryLiberary = diary === null ? [] : diary
    loadDiary(diary)
}

const changeToDogContainer = () => {
    document.getElementById("container_nav_diary").className = "nav_unselected";
    document.getElementById("container_nav_dog").className = "nav_selected";
    document.getElementById("container_nav_change").innerHTML = dogContainer;
    document.getElementById("filters").innerHTML = dogFilter;

    document.getElementById("nav_diaryBtn").style.display = 'none';

    fetch("https://dog.ceo/api/breeds/image/random/10").then((받아온결과) => {
        받아온결과.json().then((객체만뽑힌결과) => {
            console.log(객체만뽑힌결과.message)
            document.getElementById("container_table_dog").innerHTML = 객체만뽑힌결과.message.map((el) => `
                <img src="${el}" class="dog_img_normal"/>
            `).join("")
        })
    })
}

const filteringDog = (event) => {
    const dog = event.target.value
    console.log("실행은 되는거지?")
    switch (dog) {
        case 'all': 
            document.querySelectorAll('.dog_img_width').forEach((element) => {
                element.classList.replace('dog_img_width', 'dog_img_normal');
            });
            document.querySelectorAll('.dog_img_height').forEach((element) => {
                element.classList.replace('dog_img_height', 'dog_img_normal');
            });
            console.log("실행은 되는거지? 노말");
            break;
        case 'width': 
            document.querySelectorAll('.dog_img_normal').forEach((element) => {
                element.classList.replace('dog_img_normal', 'dog_img_width');
            });
            document.querySelectorAll('.dog_img_height').forEach((element) => {
                element.classList.replace('dog_img_height', 'dog_img_width');
            });
            console.log("실행은 되는거지? 가로");
            break;
        case 'height': 
            document.querySelectorAll('.dog_img_normal').forEach((element) => {
                element.classList.replace('dog_img_normal', 'dog_img_height');
            });
            document.querySelectorAll('.dog_img_width').forEach((element) => {
                element.classList.replace('dog_img_width', 'dog_img_height');
            });
            console.log("실행은 되는거지? 세로");
            break;    
    }
}

let scrolltimer = "NotYet"; // 무한스크롤 타이머 변수
window.addEventListener("scroll", () => {
    // 무한스크롤 기능 (강아지 사진목록)
    if (scrolltimer !== "NotYet") return; // Early-exit 방식 <- 중요!!!
    scrolltimer = setTimeout(() => {
        scrolltimer = "NotYet"; // 타이머 초기화
    }, 1000); // 1초 후에 타이머 초기화
    const scrollPercent = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    console.log(scrollPercent);

    if (scrollPercent <= 0.7) return;
    fetch("https://dog.ceo/api/breeds/image/random").then((받아온결과) => {
        받아온결과.json().then((객체만뽑힌결과) => {
            console.log(객체만뽑힌결과.message)
            document.getElementById("container_table_dog").innerHTML += `<img src="${객체만뽑힌결과.message}" class="dog_img_normal" />`
        })
    })

    // 푸터
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
            <button class="diary_close_btn" onclick="openModalDelete(event, ${el.diaryCnt})">
                <img src="./assets/img/lightmode_icon/close_outline_light_m.svg" />
            </button>
        </a>
    `) : null;

    if(diary !== null)
        document.getElementById("table_items").innerHTML = diaryTag.join("")
}

let diaryNum = -1;

const openModalDelete = (event, num) => {
    document.body.style.overflow = "hidden"
    window.scrollTo({ top: 0})
    event.preventDefault();
    document.getElementById("modal_diaryDelete").style.display = "block"
    diaryNum = num
}

const closeDiaryDelete = () => {
    document.body.style.overflow = "auto"
    document.getElementById("modal_diaryDelete").style.display = "none"
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

const delete_diary = () => {
    const diaryArray = JSON.parse(localStorage.getItem("diaryArray"));
    diaryArray.splice(diaryNum, 1)

    diaryArray.map((el, index) => {
        el.diaryCnt = index;
    })

    localStorage.setItem("diaryArray", JSON.stringify(diaryArray));

    loadDiary(diaryArray)

    closeDiaryDelete()
    alert("일기가 삭제되었습니다.")
}

const floating_clicked = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
}