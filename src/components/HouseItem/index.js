
import React from 'react';

import propTypes from 'prop-types';

// import './index.css'
import styles from './index.module.css'


const HouseItem = ({src, price,tags,title,desc,onClick}) => {
    // console.log(src, price,tags,title,desc,onClick)
    return (<div className={styles.house} onClick={onClick}>
        <div className={styles.imgWrap}>
            <img className={styles.img} src={src} alt=""></img>
        </div>
        <div className={styles.content}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.desc}>{desc}</div>
            <div>
                {/* ['近地铁', '随时看房'] */}
                {tags.map((tag, index) => {
                    const tagClass = 'tag' + (index + 1)
                    return (
                        <span
                            className={[styles.tag, styles[tagClass]].join(' ')}
                            key={tag}
                        >
                            {tag}
                        </span>
                    )
                })}
            </div>
            <div className={styles.price}>
                <span className={styles.priceNum}>{price}</span> 元/月
            </div>
        </div>
    </div>
    )
}


HouseItem.propTypes = {
    src: propTypes.string, 
    price: propTypes.number,
    tags: propTypes.array,
    title: propTypes.string,
    desc: propTypes.string,
    onClick:propTypes.func
};

export default HouseItem;


