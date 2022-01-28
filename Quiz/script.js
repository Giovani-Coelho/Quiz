let questionPosition = 0
let correctQuestion = 0

const showQuest = () => {
    if(questions[questionPosition]) {
        let quest = questions[questionPosition]

        let porcentageProgress = Math.floor((questionPosition / questions.length) * 100)
        
        document.querySelector('.progress--bar').style.width = `${porcentageProgress}%`

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = quest.question

        let optionsHMTL = ''
        
        for(let i in quest.options) {
            optionsHMTL += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span>${quest.options[i]}</div>`
        } 

        document.querySelector('.options').innerHTML = optionsHMTL

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })

    } else {
        finishQuiz()
    }
}

const optionClickEvent = (event) => {
    let clickEvent = parseInt(event.target.dataset.op)//precisa transformar em numero pq string nao compara com numero
    if(questions[questionPosition].answer === clickEvent) {
        correctQuestion++
    }

    questionPosition++
    showQuest()
}

const finishQuiz = () => {
    let points = Math.floor((correctQuestion / questions.length) * 100) 

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = `Você foi Mal`
        document.querySelector('.scorePct').style.color = '#FF0000';

    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = `Boa`
        document.querySelector('.scorePct').style.color = '#FFFF00';

    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = `Parabéns`
        document.querySelector('.scorePct').style.color = '#0D630D';
    }
    
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctQuestion}.`

    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = `100%`

}

const resetQuest = () => {
    questionPosition = 0
    correctQuestion = 0
    showQuest()
}

document.querySelector('.scoreArea button').addEventListener('click', resetQuest)



showQuest()

