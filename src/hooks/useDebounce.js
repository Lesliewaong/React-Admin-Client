import { useEffect } from 'react'
function useDebounce(fn, delay, dep=[]) {
   useEffect(()=>{
      let timer; 
      timer = setTimeout(fn, delay); 
      return ()=>{clearTimeout(timer);} // 这里用到useEffect清除的能力 类似于componentWillUnmount
    // eslint-disable-next-line
    }, [...dep]
  )
}
export default useDebounce