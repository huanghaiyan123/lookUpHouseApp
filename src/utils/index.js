
import { areaInfo } from './api'
export const getAreaInfo = () => {
    const cityName = JSON.parse(localStorage.getItem('hkzf_city'))
    if (!cityName) {
        return new Promise((resolve, reject) => {
            const BMapGL = window.BMapGL
            //获取定位信息
            const LocalCity = new BMapGL.LocalCity();
            LocalCity.get(async (res) => {
                try {
                    const { data } = await areaInfo(res.name)
                    localStorage.setItem('hkzf_city', JSON.stringify(data.body))
                    resolve(data.body)
                } catch (e) {
                    reject(e)
                }

            });
        })

    } else {
        return Promise.resolve(cityName)
    }
}




