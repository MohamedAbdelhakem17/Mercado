import PropTypes from 'prop-types';

const generateStars = rate => {
    const maxStars = 5;
    const stars = [];

    const clampedRate = Math.min(Math.max(rate, 0), maxStars);

    for (let i = 1; i <= maxStars; i++) {
        stars.push(clampedRate >= i
            ? <i key={i} className=" text-[gold] fa-solid fa-star"></i>
            : (clampedRate >= i - 0.5)
                ? <i key={i} className=" text-[gold] fa-solid fa-star-half-stroke"></i>
                : <i key={i} className=" text-[gold] fa-regular fa-star"></i>)
    }

    return stars;
};

generateStars.propTypes = {
    rate: PropTypes.number.isRequired
};

export default generateStars;
