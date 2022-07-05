const { createApp } = Vue;
const app = createApp({
    template: 
    `<nav class="navbar">
        <div class="container-fluid">
            <a href="/" class="navbar-brand">
                <img v-bind:src="urlLogo" alt="" width="36" height="30" class="d-inline-block align-text-top">
                {{ textLogo }}
            </a>
        </div>
    </nav>
    <div class="container">
        <div class="row row-start">
        <div class="col-lg-12">
            <h1 class="mb-3">Meme Generator</h1>
            <hr>
        </div>
        <div class="col-lg-6">
            <div class="form-group">
                <label for="meme">Meme</label>
                <select v-model="meme" id="meme" class="form-select" @change="onChange($event)">
                    <option v-for=" meme in memes" :value="meme.image">{{ meme.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="top-text">Top Text</label>
                <input type="text" id="top-text" v-model="topText" class="form-control"
                    placeholder="This text will appear on the top">
            </div>
            <div class="form-group">
                <label for="bottom-text">Bottom Text</label>
                <input type="text" id="bottom-text" v-model="bottomText" class="form-control"
                    placeholder="This text will appear on the bottom">
            </div>
            <div class="form-group" v-if="isGenerate">
                <label for="link-meme">Link</label>
                <input type="text" id="link-meme" class="form-control" placeholder="Link meme" v-model="link" disabled>
            </div>
            <button @click="generate()" class="btn btn-primary">Generate</button>
            <button @click="downloadMeme($event)" class="btn btn-primary ms-2">Download</button>
        </div>
        <div class="col-lg-6">
            <canvas ref="canvas"></canvas>
        </div>
    </div>
    <div class="row">
        <h1 class="mt-5 mb-2">Create Your Own Meme</h1>
        <hr class="mb-5">
    </div>
    <div class="col-lg-12 list-meme">
        <div class="row">
            <div class="card col-md-4 border-0" v-for="meme in paginate" @click="generate(meme)">
                <img :src="meme.image" class="card-img-top" alt="..." ref="card">
                <div class="card-body">
                    <p class="card-text">{{ meme.name}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="paginate">
        <ul class="pagination">
            <li class="page-item" :class="{ active : currentPage == index+1}"  v-for="(pageNumber, index) in totalPages" :key="index">
                <button class="page-link" @click="setPage(pageNumber)">{{ index+1 }}</button>
            </li>
        </ul>
    </div>
    </div>`,
    data() {
        return {
            perPage: 3,
            currentPage: 1,
            resultCount: 0,
            urlLogo: "./assets/logo.png",
            textLogo: "APIMeme Meme Generator",
            isGenerate: false,
            topText: "Top Text",
            bottomText: "Bottom Text",
            link: '',
            meme: "http://127.0.0.1:5500/assets/meme/meme0.jpg",
            memeUrl: '',
            imageDataUrl: "",
            memes: [
                {
                    name: "meme0",
                    image: "http://127.0.0.1:5500/assets/meme/meme0.jpg",
                },
                {
                    name: "meme1",
                    image: "http://127.0.0.1:5500/assets/meme/meme1.jpg",
                },
                {
                    name: "meme2",
                    image: "http://127.0.0.1:5500/assets/meme/meme2.jpg",
                },
                {
                    name: "meme3",
                    image: "http://127.0.0.1:5500/assets/meme/meme3.jpg",
                },
                {
                    name: "meme4",
                    image: "http://127.0.0.1:5500/assets/meme/meme4.jpg",
                },
                {
                    name: "meme5",
                    image: "http://127.0.0.1:5500/assets/meme/meme5.jpg",
                },
                {
                    name: "meme6",
                    image: "http://127.0.0.1:5500/assets/meme/meme6.jpg",
                },
                {
                    name: "meme7",
                    image: "http://127.0.0.1:5500/assets/meme/meme7.jpg",
                },
                {
                    name: "meme8",
                    image: "http://127.0.0.1:5500/assets/meme/meme8.jpg",
                },
                {
                    name: "meme9",
                    image: "http://127.0.0.1:5500/assets/meme/meme9.jpg",
                },
                {
                    name: "meme10",
                    image: "http://127.0.0.1:5500/assets/meme/meme10.jpg",
                },
            ],
        };
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
        },
    },
    methods: {
        onChange(e) {
            this.meme = e.target.value;
        },

        setPage(pageNumber) {
            this.currentPage = pageNumber;
            console.log(pageNumber);
        },
        generate(e) {
            if (e !== undefined) {
                this.meme = e.image;
            }
            this.isGenerate = true;
            let image = new Image();
            image.src = this.meme;
            image.onload = (e) => {
                let canvas = this.$refs.canvas;
                const ctx = canvas.getContext("2d");
                const width = image.width;
                const height = image.height;
                const fontSize = Math.floor(width / 10);
                const yOffset = height / 25;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(image, 0, 0);

                // Prepare text
                ctx.strokeStyle = "black";
                ctx.lineWidth = Math.floor(fontSize / 4);
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.lineJoin = "round";
                ctx.font = `${fontSize}px sans-serif`;

                // Add top text
                ctx.textBaseline = "top";
                ctx.strokeText(this.topText, width / 2, yOffset);
                ctx.fillText(this.topText, width / 2, yOffset);

                // Add bottom text
                ctx.textBaseline = "bottom";
                ctx.strokeText(this.bottomText, width / 2, height - yOffset);
                ctx.fillText(this.bottomText, width / 2, height - yOffset);
                // this.link = canvas.toDataURL("image/jpg").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
                this.link = canvas.toDataURL("image/png");
            };
        },
        downloadMeme(e) {
            if (this.isGenerate) {
                let canvas = this.$refs.canvas;
                let canvasUrl = canvas.toDataURL("image/png");
                const createEl = document.createElement('a');
                createEl.href = canvasUrl;
                createEl.download = "your-meme";
                createEl.click();
                createEl.remove();
            }
        }
    },
});
app.mount("#app");
