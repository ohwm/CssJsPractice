window.onload = () => {
    changeToDiaryContainer();
    setFloatingIcon(false);
}

let currentDiaryList = []; // 현재 보여줄 diary 배열

// 전역변수를 활용하여 페이지네이션과 다이어리 렌더링을 동기화
// setDiaryList 함수를 통해 currentDiaryList를 업데이트하고
// render와 renderDiary를 호출
const setDiaryList = (newList) => {
  currentDiaryList = newList;
  renderDiary(1, currentDiaryList);
  render(1, currentDiaryList);
}

const darkmode = () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    setFloatingIcon(isDark);
}  

const setFloatingIcon = (isDark) => {
  const lightIcon = document.querySelector('.floating_icon-light');
  const darkIcon = document.querySelector('.floating_icon-dark');
  if (isDark) {
    lightIcon.classList.remove('active');
    darkIcon.classList.add('active');
  } else {
    lightIcon.classList.add('active');
    darkIcon.classList.remove('active');
  }
}

const dropdownSelect = (event) => {
    const title = document.querySelector(".dropdownTitle");
    switch (event.target.id) {
        case 'all': 
            title.style.setProperty("--select", `"전체"`);
            title.click();
            break;
        case 'happy': 
            title.style.setProperty("--select", `"행복해요"`);
            title.click();
            break;
        case 'sad': 
            title.style.setProperty("--select", `"슬퍼요"`);
            title.click();
            break;
        case 'suprised': 
            title.style.setProperty("--select", `"놀랐어요"`);
            title.click();
            break;
        case 'angry': 
            title.style.setProperty("--select", `"화나요"`);
            title.click();
            break;    
        case 'extra': 
            title.style.setProperty("--select", `"기타"`);
            title.click();
            break;  
        case 'normal': 
            title.style.setProperty("--select", `"기본형"`);
            title.click();
            break;
        case 'width': 
            title.style.setProperty("--select", `"가로형"`);
            title.click();
            break;
        case 'height': 
            title.style.setProperty("--select", `"세로형"`);
            title.click();
            break;
    }
}
 
const diaryContainer = `
    <div id="container_table" class="container_table">
        <div id="table_items">
            <!-- 아이템 추가되는 곳 -->
        </div>
    </div>
    <div id="diary_pagination" class="diary_pagination">
        <button id="prev_btn" class="page_btn" onclick="changePage(event)">이전</button>
        <div id="page_box" class="page_box"></div>
        <button id="next_btn" class="page_btn" onclick="changePage(event)">다음</button>
    </div>
`
const dogContainer = `
    <div id="container_table_dog" class="container_table_dog"></div>
`

const diaryFilter = `
    <input type="checkbox" class="dropdownTitle" />
    <ul class="dropdownList">
        <li>
            <input type="radio" name="emotion" id="all" onclick="dropdownSelect(event); filteringDiary(event)"/>
            <label for="all">전체</label>
        </li>
        <li>
            <input type="radio" name="emotion" id="happy" onclick="dropdownSelect(event); filteringDiary(event)"/>
            <label for="happy">행복해요</label>
        </li>
        <li>
            <input type="radio" name="emotion" id="sad" onclick="dropdownSelect(event); filteringDiary(event)"/>
            <label for="sad">슬퍼요</label>
        </li>
        <li>
            <input type="radio" name="emotion" id="suprised" onclick="dropdownSelect(event); filteringDiary(event)"/>
            <label for="suprised">놀랐어요</label>
        </li>
        <li>
            <input type="radio" name="emotion" id="angry" onclick="dropdownSelect(event); filteringDiary(event)"/>
            <label for="angry">화나요</label>
        </li>
        <li>
            <input type="radio" name="emotion" id="extra" onclick="dropdownSelect(event); filteringDiary(event)"/>
            <label for="extra">기타</label>
        </li>
    </ul>
`

const dogFilter = `
    <input type="checkbox" class="dropdownTitle" />
    <ul class="dropdownList">
        <li>
            <input type="radio" name="dog" id="normal" onclick="dropdownSelect(event); filteringDog(event)"/>
            <label for="normal">기본형</label>
        </li>
        <li>
            <input type="radio" name="dog" id="width" onclick="dropdownSelect(event); filteringDog(event)"/>
            <label for="width">가로형</label>
        </li>
        <li>
            <input type="radio" name="dog" id="height" onclick="dropdownSelect(event); filteringDog(event)"/>
            <label for="sheightad">세로형</label>
        </li>
    </ul>
`

let isDiary = true;
const changeToDiaryContainer = () => {
    isDiary = true;
    document.getElementById("container_nav_diary").className = "nav_selected";
    document.getElementById("container_nav_dog").className = "nav_unselected";

    document.getElementById("filters").innerHTML = diaryFilter;
    document.getElementById("nav_diaryBtn").style.display = 'flex';
    document.getElementById("search_bar").style.display = 'flex';

    document.getElementById("container_nav_change").innerHTML = diaryContainer;
    const diary = JSON.parse(localStorage.getItem("diaryArray"))
    const diaryLiberary = diary === null ? [] : diary
    loadDiary(diaryLiberary)
    setDiaryList(diaryLiberary);
}

const changeToDogContainer = () => {
    isDiary = false;
    document.getElementById("container_nav_diary").className = "nav_unselected";
    document.getElementById("container_nav_dog").className = "nav_selected";
    document.getElementById("container_nav_change").innerHTML = dogContainer;
    document.getElementById("filters").innerHTML = dogFilter;

    document.getElementById("nav_diaryBtn").style.display = 'none';
    document.getElementById("search_bar").style.display = 'none';

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
    const dog = event.target.id
    console.log(dog)
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

    if (isDiary) return; // 다이어리 화면일 때는 무한스크롤 기능 작동 X

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
            const dog_filter = document.getElementById("dog_filter").value
            document.getElementById("container_table_dog").innerHTML += `<img src="${객체만뽑힌결과.message}" class="dog_img_${dog_filter}" />`
        })
    })

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
    diaryLiberary.unshift(diary)
    localStorage.setItem("diaryArray", JSON.stringify(diaryLiberary));
    openDiaryDone();
    loadDiary(diaryLiberary);
    setDiaryList(diaryLiberary);
}

const filteringDiary = (event) => {
    const emotionValue = event.target.id
    console.log(emotionValue)
    const diaryArray = JSON.parse(localStorage.getItem("diaryArray"));
    let filteredDiary = emotionValue !== "all" ? diaryArray.filter((el) => el.emotion === emotionValue) : diaryArray

    loadDiary(filteredDiary);
    setDiaryList(filteredDiary);
}

let searchTimer = "NotYet";
const searchDiary = (event) => {
    if (searchTimer !== "NotYet") {
        clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(() => {
        searchTimer = "NotYet";
        const keyword = event.target.value
        const diaryArray = JSON.parse(localStorage.getItem("diaryArray"));
        let searchedDiary = diaryArray.filter((el) => el.title.includes(keyword))

        loadDiary(searchedDiary)
        setDiaryList(searchedDiary);
    }, 1000);
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

let currentPage = 1;
const render = (clickedPage, diaryList) => {
    const itemsPerPage = 12;
    const lastPage = Math.ceil(diaryList.length / itemsPerPage);
    const pageBox = new Array(10).fill("page");
    const pages = pageBox.map((el, index) => {
        const pageNumber = index + currentPage;

        return pageNumber <= lastPage ? `
		    <button 
				class=${clickedPage === pageNumber ? "pageClicked" : "pageUnclicked"}
				onclick="renderDiary(${pageNumber}, currentDiaryList);render(${pageNumber}, currentDiaryList)"
			>
			${pageNumber}</button>` : `<span> </span>`;
    }).join("");
    document.getElementById("page_box").innerHTML = pages;  
}

const prevPage = () => {
    currentPage = currentPage > 1 ? currentPage - 5 : 1;
    render(currentPage); 
};

const nextPage = () => {
    currentPage = currentPage + 5 <= lastPage ? currentPage + 5 : currentPage;
    render(currentPage);
};

const renderDiary = (num, diaryList) => {
    const filteredDiaryList = diaryList.filter((el, index) => index <= (num - 1) * 12 + 11 && index >= (num - 1) * 12);
    console.log(filteredDiaryList);
    loadDiary(filteredDiaryList);
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
    setDiaryList(diaryArray);

    closeDiaryDelete()
    alert("일기가 삭제되었습니다.")
}

const floating_clicked = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
}