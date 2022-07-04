const { createApp } = Vue
const app = createApp({
    data() {
        return {
            perPage: 3,
            currentPage: 1,
            resultCount: 0,
            urlLogo: './assets/logo.png',
            textLogo: 'APIMeme Meme Generator',
            title: 'Meme Generator',
            isGenerate: false,
            memes: [
                {
                    name: 'meme0',
                    image: './assets/meme/meme0.jpg'
                },
                {
                    name: 'meme1',
                    image: './assets/meme/meme1.jpg'
                },
                {
                    name: 'meme2',
                    image: './assets/meme/meme2.jpg'
                },
                {
                    name: 'meme3',
                    image: './assets/meme/meme3.jpg'
                },
                {
                    name: 'meme4',
                    image: './assets/meme/meme4.jpg'
                },
                {
                    name: 'meme5',
                    image: './assets/meme/meme5.jpg'
                },
                {
                    name: 'meme6',
                    image: './assets/meme/meme6.jpg'
                },
                {
                    name: 'meme7',
                    image: './assets/meme/meme7.jpg'
                },
                {
                    name: 'meme8',
                    image: './assets/meme/meme8.jpg'
                },
                {
                    name: 'meme9',
                    image: './assets/meme/meme9.jpg'
                },
                {
                    name: 'meme10',
                    image: './assets/meme/meme10.jpg'
                },
            ]

        }
    },
    computed: {
        totalPages() {
            console.log(Math.ceil(this.resultCount / this.perPage) + "totalPages");
            return Math.ceil(this.resultCount / this.perPage);
        },
        paginate() {
            this.resultCount = this.memes.length;
            console.log(this.currentPage);
            var index = (this.currentPage - 1) * this.perPage;
            console.log(this.memes.slice(index, index + this.perPage));
            return this.memes.slice(index, index + this.perPage);
        }
    },
    methods: {
        setPage(pageNumber) {
            this.currentPage = pageNumber;
            console.log(pageNumber);
        },
        generate() {
            this.isGenerate = true;
        }
    }

})
app.mount('#app')