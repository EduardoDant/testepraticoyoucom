import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '../components/header'
import Produto from '../components/produto'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ prodsJSON }: {prodsJSON: object | any[]}) {
  //array que recebera os produtos
  const pJson: any = prodsJSON
  let prodsArray = pJson.products
  //array que filtrará as categorias
  let categories = ["tops", "womens-dresses", "womens-shoes", "mens-shirts", "mens-shoes", "mens-watches", "womens-watches", "womens-bags", "womens-jewellery", "sunglasses"]

  //check BodyWidth and Height pt1
  const [bodyType, setBodyType] = useState(styles.prodsBodyM)
  const [videoResp, setVideoResp] = useState(styles.videoRespM)
  const [videoMask, setVideoMask] = useState(styles.videoMaskM)

  //estado dos dados dos prods
  const [imgs, setImg] = useState([''])
  const [name, setName] = useState([''])
  const [oPrice, setOPrice] = useState([''])
  const [nPrice, setNPrice] = useState([''])
  const [rating, setRating] = useState([''])

  function renderAtts() {
    const itens = []
    for (let o = 0; o < imgs.length; o++) {
      itens.push(<Produto key={imgs[o]} imgURL={imgs[o]} name={name[o]} oPrice={oPrice[o]} nPrice={nPrice[o]} rating={rating[o]} />)
    }
    return itens
  }

  //check BodyWidth and Height pt2
  if (typeof window !== "undefined" && window.innerWidth > window.innerHeight) {
    useEffect(() => {
      setBodyType(styles.prodsBodyD)
      setVideoResp(styles.videoRespD)
      setVideoMask(styles.videoMaskD)
    }, [])
  }

  //lê o json e altera os estados

  useEffect(() => {
    const imgProdArray = []
    const nameProdArray = []
    const oldPriceProdArray = []
    const newPriceProdArray = []
    const ratingProdArray = []
    for (let i = 0; i < prodsArray.length; i++) {
      if (categories.includes(prodsArray[i].category) && prodsArray[i].stock >= 10) {
        imgProdArray.push(prodsArray[i].images[0])
        nameProdArray.push(prodsArray[i].title)
        oldPriceProdArray.push('R$ ' + (prodsArray[i].price + ((prodsArray[i].price * prodsArray[i].discountPercentage) / 100)).toFixed(2).replace('.', ','))
        newPriceProdArray.push(' R$ ' + prodsArray[i].price.toFixed(2).replace('.', ','))
        ratingProdArray.push(prodsArray[i].rating)
      }
    }
    setImg(imgProdArray)
    setName(nameProdArray)
    setOPrice(oldPriceProdArray)
    setNPrice(newPriceProdArray)
    setRating(ratingProdArray)
  }, [])

  return (
    <>
      <Head>
        <title>YouCom: Vem cá conferir suas peças favoritas</title>
        <meta name="description" content="na youcom, você encontra itens trend pra te acompanhar em qualquer momento. calças, t-shirts, shorts, saias, vestidos, jaquetas e muito mais. confira!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainz}>
        <Header />
        <div className={videoMask}>
          <video className={videoResp} width="100%" height="" loop autoPlay muted>
            <source src="youcom.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className={bodyType}>
          {renderAtts()}
        </div>
        <Footer />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://dummyjson.com/products?limit=101');
  const data = await response.json();

  return {
    props: {
      prodsJSON: data,
    },
    revalidate: 30
  }
}