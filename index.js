const createElement = (arr) => {
  const htmlElements = arr.map(
    (el) =>
      `<p class="bg-[#EDF7FF] border border-[#D7E4EF] rounded-md px-5 py-[6px]">${el}</p>`
  );
  return htmlElements.join(" ");
};

const loading = (status) => {
  if (status == true) {
    document.getElementById("spaning").classList.remove("hidden");
    document.getElementById("card-container").classList.add("hidden");
  } else {
    document.getElementById("card-container").classList.remove("hidden");
    document.getElementById("spaning").classList.add("hidden");
  }
};

const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all#";

  fetch(url)
    .then((rec) => rec.json())
    .then((data) => {
      displayLesson(data.data);
    });
};

const removeActiveBtn = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons);
  lessonButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadLevelWord = (id) => {
  loading(true);
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveBtn();
      const activeBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(activeBtn);
      activeBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayDetails(details.data);
};

const displayDetails = (word) => {
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
  
    <div class="space-y-6">
              <div class="">
                <h3 class="text-4xl font-semibold hind-siliguri-font">
                  ${word.word} (<i class="fa-solid fa-microphone-lines"></i>: ${
    word.pronunciation
  })
                </h3>
              </div>
              <div class="">
                <h5 class="text-2xl font-semibold poppins-font">Meaning</h5>
                <p class="text-2xl font-medium hind-siliguri-font">${
                  word.meaning
                }</p>
              </div>
              <div class="">
                <h3 class="text-xl font-semibold poppins-font">Example</h3>
                <p class="text-xl font-medium opacity-[0.8]">${
                  word.sentence
                }</p>
              </div>
              <p class="text-2xl font-medium hind-siliguri-font">সমার্থক শব্দ গুলো</p>
              <div class="flex items-center gap-3">
                ${createElement(word.synonyms)}
              </div>
            </div>

  `;
  document.getElementById("my_modal").showModal();
};

{
  /* <p class="bg-[#EDF7FF] border border-[#D7E4EF] rounded-md px-5 py-[6px]">${word.synonyms[0] ? word.synonyms[0]  : ' '}</p>
                <p class="bg-[#EDF7FF] border border-[#D7E4EF] rounded-md px-5 py-[6px]">${word.synonyms[1] ? word.synonyms[1]  : ' '}</p>
                <p class="bg-[#EDF7FF] border border-[#D7E4EF] rounded-md px-5 py-[6px]">${word.synonyms[2] ? word.synonyms[2]  : ' '}</p> */
}

const displayLevelWord = (words) => {
  // console.log(words);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  //   console.log(words);
  if (words.length === 0) {
    cardContainer.innerHTML = `
    <div class="py-16 text-center col-span-full hind-siliguri-font bg-slate-100 rounded-xl" id="">
    <img src="./assets/alert-error.png" alt="" class="inline-block" />
          <p class="text-[#79716B] text-sm mb-3 mt-3">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
          </p>
          <h3 class="text-[#292524] text-4xl font-medium">
            নেক্সট Lesson এ যান
          </h3>
        </div>
    `;
    loading(false);
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");

    card.innerHTML = `
    <div class="text-center rounded-lg p-14 bg-slate-100 shadow-md">
          <h3 class="mb-6 text-[32px] font-bold poppins-font">${
            word.word ? word.word : "শব্দ পাওয়া যায়নি"
          }</h3>
          <p class="mb-6 text-xl font-medium hind-siliguri-font">Meaning / Pronounciation</p>
          <p class="text-[32px] font-semibold text-[#18181B] mb-14 hind-siliguri-font">${
            word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
          } / ${
      word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"
    }</p>
          <div class="flex justify-between items-center">
            <div onclick="loadWordDetails(${
              word.id
            })" class="btn p-6 bg-[#1A91FF1A] rounded-lg"><i class="fa-solid fa-circle-info"></i></div>
            <div class="btn bg-[#1A91FF1A] rounded-lg p-6"><i class="fa-solid fa-volume-high"></i></div>
          </div>
        </div>
    `;
    cardContainer.append(card);
  });
  loading(false);
};

const displayLesson = (lessons) => {
  //   console.log(lessons);
  //   1. get tha container and empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  //   2. get into every lessons
  for (const lesson of lessons) {
    // console.log(lesson);
    // 3. create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id='lesson-btn-${lesson.level_no}' onclick='loadLevelWord(${lesson.level_no})'
            class="lesson-btn-${lesson.level_no} btn text-[14px] text-center font-semibold poppins-font text-[#422AD5] border-[#422AD5] hover:bg-[#422AD5] hover:text-[#E0E7FF] lesson-btn"
          >
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
          </button>
    `;
    levelContainer.append(btnDiv);
  }
};

loadLessons();
