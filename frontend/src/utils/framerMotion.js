 export const containerInfo = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            staggerChildren: 0.08, // Stagger the animation of child elements
        },
    },
};

export const itemInfo = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};