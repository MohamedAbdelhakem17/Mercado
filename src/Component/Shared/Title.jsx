import PropTypes from 'prop-types';

const Title = ({ title }) => {
    return (
        <h3>
            {title.split(" ").map((word, index) => (
                <span key={index} className={`${index === 1 ? 'text-main' : ''} px-1 font-medium text-2xl`}>
                    {word}
                </span>
            ))}
        </h3>
    );
};

Title.propTypes = {
    title: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Title;
