//大事！！！！！！！！！！
//await => awaitを指定したPromiseな関数がresolveや、rejectを返すまで処理を待つ。
//もし、awaitを指定した関数がPromiseでなければ関数がPromise.resolbeされたときと同じ挙動になる。

console.log("hello world")

const sleep = (s: number) => new Promise(resolve => setTimeout(resolve, s * 1000))

const heavyRequest = async (idx: number) => {
    //2から6秒のランダムなリクエストのようなダミー関数
    const num = Math.floor(Math.random() * 5 + 2)
    await sleep(num)
    console.log(`${idx}: fin ${num}s single request`)
    return (`  index${idx}: ${num}s`)
}

const BadRequestExample = async () => {
    //それぞれの関数がresolveされるまで待つようになっているので、a, b, cが逐次実行される。
    const a = await heavyRequest(0)
    const b = await heavyRequest(1)
    const c = await heavyRequest(2)
    return (`fin Bad Request Example: ${a} ${b} ${c} `)
}

BadRequestExample().then((res) => { console.log(res) })


const GoodRequestExample = async () => {
    //3つの関数を一気に実行。awaitを用いているので、全ての関数(Promise)がresolveされたら次の行のコンソールを実行し、終了する。
    //ちなみにdにはresolveされたそれぞれの関数の結果が入る
    const d = await Promise.all([heavyRequest(0), heavyRequest(1), heavyRequest(2)])

    //同様のことを下のようにも書くことが出来ます。
    // const d: Array<String> = []
    // await Promise.all([heavyRequest(0), heavyRequest(1), heavyRequest(2)]).then((res) => {
    //     res.forEach(element => {
    //         d.push(element)
    //     });
    // })

    console.log(`Promise.allの処理が終わったので、returnをしてGoodRequestExampleをresolveしようと思います`)
    return (`Good Request Example is resolved: \nfin Time: \n${d} `)
}

GoodRequestExample().then((res) => { console.log(res) })

// const getDisplayDate = () => {
//     let date = new Date();
//     let Hour = ('0' + date.getHours()).slice(-2)
//     let Minute = ('0' + date.getMinutes()).slice(-2)
//     let Second = ('0' + date.getSeconds()).slice(-2)
//     //HH:MM:SS形式に整形
//     return Hour + ':' + Minute + ':' + Second
// }


// const forloop = () => new Promise(resolve => {
//     let j = 0
//     for (let i = 0; i < 100; i++) {
//         j++
//     }
//     return ('fin forloop')
// })


// const AsyncFunction = async () => {
//     const execution = () => console.log(`間隔: ${getDisplayDate()} 秒`)
//     const Awaitfunc = async () => {
//         //1秒間隔で、executionメソッドを実行
//         let intervalId = setInterval(execution, 1000)
//         //5秒経過したあとに停止
//         setTimeout(() => clearInterval(intervalId), 5000)
//         return ('success')
//     }

//     await console.log('1')
//     console.log('2')
//     await sleep(5000);
//     await forloop().then((res) => { console.log(res) })
//     // await Awaitfunc().then((res) => { console.log(res) })
//     console.log('3')
//     return "hello"
// }

// const a = AsyncFunction()
// // const a = AsyncFunction().then((res) => { console.log(res) })
// a.then((res) => { console.log(res) })
// console.log("a", a)
