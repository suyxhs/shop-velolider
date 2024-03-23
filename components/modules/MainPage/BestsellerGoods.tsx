import { useUnit } from 'effector-react'
// import { getBestsellerProductsFx } from '@/api/main-page'
import { $bestsellerProducts } from '@/context/goods'
// import { useLang } from '@/hooks/useLang'

const BestsellerGoods = () => {
  const goods = useUnit($bestsellerProducts)
  //   const spinner = useUnit(getBestsellerProductsFx.pending)
  //   const { lang, translations } = useLang()
  console.log(goods)

  return <div />
}

export default BestsellerGoods
