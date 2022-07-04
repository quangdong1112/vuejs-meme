const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      resultCount: 0,
      urlLogo: "./assets/logo.png",
      textLogo: "APIMeme Meme Generator",
      title: "Meme Generator",
      isGenerate: false,
      topText: "Top Text",
      bottomText: "Bottom Text",
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
      this.imageDataUrl = e.target.value;
    },

    setPage(pageNumber) {
      this.currentPage = pageNumber;
      console.log(pageNumber);
    },
    generate() {
      this.isGenerate = true;
      let image = new Image();
      image.src = this.imageDataUrl ? this.imageDataUrl : this.meme;
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
        this.memeUrl = canvas.toDataURL("image/jpg").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
      };
    },
    downloadMeme() {
        window.location.href = this.memeUrl;
    }
  },
});
app.mount("#app");
