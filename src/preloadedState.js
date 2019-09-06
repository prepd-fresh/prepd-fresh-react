const preloadedState = {
    heroImageUrl: 'Photo-by-Daniel-Park-on-Unsplash.jpg',
    infoCards: [
        {
            imageUrl: 'Photo-by-Megan-Hodges-on-Unsplash.jpg',
            hed: 'A menu that updates every week',
            dek: 'Every week features a fresh menu, to keep your tastebuds happy!'
        },
        {
            imageUrl: 'Photo-by-Suhyeon-Choi-on-Unsplash.jpg',
            hed: 'A menu that updates every week',
            dek: 'Every week features a fresh menu, to keep your tastebuds happy!'
        },
        {
            imageUrl: 'Photo-by-Fabian-Blank-on-Unsplash.jpg',
            hed: 'A menu that updates every week',
            dek: 'Every week features a fresh menu, to keep your tastebuds happy!'
        },
    ],
    testimonialHeadingImgUrl: 'Photo-by-Katherine-Chase-on-Unsplash.jpg',
    testimonials: [
        {
            id: 'fdga78df6gasd',
            imageUrl: 'testimonials-1.jpg',
            name: 'Firstname L.',
            quote: 'This space is reserved for a quote from one of our users!'
        },
        {
            id: 'asdf78df6gasd',
            imageUrl: 'testimonials-2.jpg',
            name: 'Firstname L.',
            quote: 'This space is reserved for a quote from one of our users!'
        },
        {
            id: 'erty78df6gasd',
            imageUrl: 'testimonials-3.jpg',
            name: 'Firstname L.',
            quote: 'This space is reserved for a quote from one of our users!'
        },
    ],
    sliderImgUrl: 'Photo-by-yvonne-lee-harijanto-on-Unsplash.jpg',
    products: {
        fdga78df6gasd: {
            type: 'meal',
            id: 'fdga78df6gasd',
            hed: 'Pesto Chicken',
            dek: 'This is a brief description of the menu item, yum!',
            vOpt: true,
            imageUrl: 'meal_1.jpg',
            sm: {
                price: 6.99,
                nutrition: {
                    cal: 270,
                    car: 44,
                    fat: 20,
                    pro: 22
                }
            },
            lg: {
                price: 7.99,
                nutrition: {
                    cal: 540,
                    car: 88,
                    fat: 40,
                    pro: 44
                }
            }
        },
        sd79fsd89afsd: {
            type: 'meal',
            id: 'sd79fsd89afsd',
            hed: 'Broccoli Salad',
            dek: 'This is a brief description of the menu item, yum!',
            vOpt: true,
            imageUrl: 'meal_2.jpg',
            sm: {
                price: 6.99,
                nutrition: {
                    cal: 270,
                    car: 44,
                    fat: 20,
                    pro: 22
                }
            },
            lg: {
                price: 7.99,
                nutrition: {
                    cal: 540,
                    car: 88,
                    fat: 40,
                    pro: 44
                }
            }
        },
        a978df6g7869agasd: {
            type: 'meal',
            id: 'a978df6g7869agasd',
            hed: 'Something Else',
            dek: 'This is a brief description of the menu item, yum!',
            vOpt: true,
            imageUrl: 'meal_3.jpg',
            sm: {
                price: 6.99,
                nutrition: {
                    cal: 270,
                    car: 44,
                    fat: 20,
                    pro: 22
                }
            },
            lg: {
                price: 7.99,
                nutrition: {
                    cal: 540,
                    car: 88,
                    fat: 40,
                    pro: 44
                }
            }
        },
    },
};

export default preloadedState;