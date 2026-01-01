// Demo veri seti (telifli içerik akışı yoktur).
// "trailer" YouTube embed linkidir (resmî trailer). İstersen sen değiştirebilirsin.
// "where" alanı: resmi platform arama linkleri (her ülkede farklı olabilir).

export const ITEMS = [
  {
    id: "m1",
    kind: "Film",
    title: "Inception",
    year: 2010,
    rating: 8.8,
    tags: ["Bilim Kurgu", "Aksiyon", "Gizem"],
    blurb: "Rüya içinde rüya: Bir fikri çalmak değil, yerleştirmek.",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    poster: "https://images.pexels.com/photos/9807584/pexels-photo-9807584.jpeg?auto=compress&cs=tinysrgb&w=600",
    posterAttribution: "Ron Lach on Pexels",
    where: [
      { name: "Netflix", url: "https://www.netflix.com/tr/title/70131314" },
      { name: "Amazon Prime", url: "https://www.primevideo.com/detail/0K2F3SMGB3ZFQJHRZH1YWTQJP1" },
      { name: "Apple TV", url: "https://tv.apple.com/movie/inception/umc.cmc.4lv8alunhfmhqljc2xp1hm4mp" },
      { name: "JustWatch", url: "https://www.justwatch.com/tr/film/inception" },
      { name: "IMDb", url: "https://www.imdb.com/title/tt1375666/" }
    ],
    popularity: 95,
    fresh: true,
    top: true
  },
  {
    id: "s1",
    kind: "Dizi",
    title: "Breaking Bad",
    year: 2008,
    rating: 9.5,
    tags: ["Drama", "Suç"],
    blurb: "Bir kimya öğretmeninin dönüşümü: azim, risk ve bedel.",
    trailer: "https://www.youtube.com/embed/HhesaQXLuRY",
    poster: "https://pixabay.com/get/gd2bd1817cc2538975ec201e5370027ad42d9dbbb2c4076ae416e3d846d96bddfad42a950c3570bd5bcca488eed814d4f.jpg",
    posterAttribution: "Sunriseforever on Pixabay",
    where: [
      { name: "Netflix", url: "https://www.netflix.com/tr/title/70143836" },
      { name: "JustWatch", url: "https://www.justwatch.com/tr/dizi/breaking-bad" },
      { name: "IMDb", url: "https://www.imdb.com/title/tt0903747/" }
    ],
    popularity: 93,
    fresh: false,
    top: true
  },
  {
    id: "m2",
    kind: "Film",
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    tags: ["Bilim Kurgu", "Macera"],
    blurb: "İnsanlığın geleceği için yıldızların ötesine yolculuk.",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
    poster: "https://images.unsplash.com/photo-1570260918970-001c33fc800f?w=600&auto=format&fit=crop",
    posterAttribution: "Claudio Schwarz on Unsplash",
    where: [
      { name: "Amazon Prime", url: "https://www.primevideo.com/detail/0KPGQXOH0XBMCJYDXFQVXH5WFY" },
      { name: "Apple TV", url: "https://tv.apple.com/movie/interstellar/umc.cmc.3o1a3bw68ey37dpz13ujv9qg4" },
      { name: "Google Play", url: "https://play.google.com/store/movies/details/Interstellar?id=x3Z2X8Eo0H8" },
      { name: "JustWatch", url: "https://www.justwatch.com/tr/film/interstellar" },
      { name: "IMDb", url: "https://www.imdb.com/title/tt0816692/" }
    ],
    popularity: 90,
    fresh: false,
    top: true
  },
  {
    id: "s2",
    kind: "Dizi",
    title: "The Last of Us",
    year: 2023,
    rating: 8.7,
    tags: ["Drama", "Macera", "Kıyamet Sonrası"],
    blurb: "Yıkılmış bir dünyada bağ kurmak, hayatta kalmaktan zor.",
    trailer: "https://www.youtube.com/embed/uLtkt8BonwM",
    poster: "https://pixabay.com/get/g84921de9efafe38599f085aaefe982360050d74a97e5597d1fcd5f3673201dd2c9c9e4f81f6b38d4f0b111f2cdcd5244.jpg",
    posterAttribution: "J-SEBASTIEN on Pixabay",
    where: [
      { name: "HBO Max", url: "https://www.max.com/tr/tr/shows/the-last-of-us/1ff15ea3-1b58-4d1d-a95b-b1616ac83c1d" },
      { name: "JustWatch", url: "https://www.justwatch.com/tr/dizi/the-last-of-us" },
      { name: "IMDb", url: "https://www.imdb.com/title/tt3581920/" }
    ],
    popularity: 92,
    fresh: true,
    top: false
  },
  {
    id: "m3",
    kind: "Film",
    title: "Spider-Man: Into the Spider‑Verse",
    year: 2018,
    rating: 8.4,
    tags: ["Animasyon", "Aksiyon"],
    blurb: "Çoklu evrende birden fazla Spider‑Man, tek bir hikâye.",
    trailer: "https://www.youtube.com/embed/g4Hbz2jLxvQ",
    poster: "https://images.unsplash.com/photo-1685638698323-b562fee76faa?w=600&auto=format&fit=crop",
    posterAttribution: "Punto Fotográfico on Unsplash",
    where: [
      { name: "Netflix", url: "https://www.netflix.com/tr/title/81002747" },
      { name: "Amazon Prime", url: "https://www.primevideo.com/detail/0MXGF4Q5RLH4FNRDIJJQQ3BHEK" },
      { name: "Apple TV", url: "https://tv.apple.com/movie/spider-man-into-the-spider-verse/umc.cmc.36lwda7vyl2sz5hcdj59g0w1w" },
      { name: "JustWatch", url: "https://www.justwatch.com/tr/film/spider-man-into-the-spider-verse" },
      { name: "IMDb", url: "https://www.imdb.com/title/tt4633694/" }
    ],
    popularity: 86,
    fresh: false,
    top: false
  },
  {
    id: "s3",
    kind: "Dizi",
    title: "Sherlock",
    year: 2010,
    rating: 9.1,
    tags: ["Gizem", "Suç", "Drama"],
    blurb: "Modern Londra'da dedektiflik: zeka, hız, detay.",
    trailer: "https://www.youtube.com/embed/xK7S9mrFWL4",
    poster: "https://pixabay.com/get/gae69e37f6e84f810936614151def2f3e8ffca537d49dd39720a801403a4c3e8517ac9016e1c2ddf9e21951df69b4ddbc.jpg",
    posterAttribution: "Sammy-Sander on Pixabay",
    where: [
      { name: "Netflix", url: "https://www.netflix.com/tr/title/70202589" },
      { name: "JustWatch", url: "https://www.justwatch.com/tr/dizi/sherlock" },
      { name: "IMDb", url: "https://www.imdb.com/title/tt1475582/" }
    ],
    popularity: 84,
    fresh: false,
    top: true
  },
  {
    id: "m4",
    kind: "Film",
    title: "Dune: Part Two",
    year: 2024,
    rating: 8.6,
    tags: ["Bilim Kurgu", "Epik"],
    blurb: "Kumların üzerinde bir imparatorluğun kaderi.",
    trailer: "https://www.youtube.com/embed/U2Qp5pL3ovA",
    poster: "https://images.pexels.com/photos/34327869/pexels-photo-34327869.jpeg?auto=compress&cs=tinysrgb&w=600",
    posterAttribution: "Mostafa Ft.shots on Pexels",
    where: [
      { name: "HBO Max", url: "https://www.max.com/tr/tr/movies/dune-part-two/gAYYVv4yzYUjBlwEAAAEZ" },
      { name: "Amazon Prime", url: "https://www.primevideo.com/detail/0U8E4LH3EFMVBQW2X3F1R5DMFO" },
      { name: "Apple TV", url: "https://tv.apple.com/movie/dune-part-two/umc.cmc.4m9n1dqw8yjxjqvdn8mrmrggc" },
      { name: "Google Play", url: "https://play.google.com/store/movies/details/Dune_Part_Two?id=vC4FWLp1Ll8" },
      { name: "JustWatch", url: "https://www.justwatch.com/tr/film/dune-part-two" },
      { name: "IMDb", url: "https://www.imdb.com/title/tt15239678/" }
    ],
    popularity: 94,
    fresh: true,
    top: true
  },
  {
    id: "s4",
    kind: "Dizi",
    title: "Stranger Things",
    year: 2016,
    rating: 8.7,
    tags: ["Bilim Kurgu", "Gerilim"],
    blurb: "Küçük bir kasaba, büyük bir sır ve tersine bir dünya.",
    trailer: "https://www.youtube.com/embed/b9EkMc79ZSU",
    poster: "https://pixabay.com/get/g79ed96ee2061cf55029d6da34ad09a0d41c23ff31ea0e550c18b347d8f714fda6bc0f905e3be02dfda99efe360427af2.png",
    posterAttribution: "AmateurArtist on Pixabay",
    where: [
      { name: "Netflix", url: "https://www.netflix.com/tr/title/80057281" },
      { name: "JustWatch", url: "https://www.justwatch.com/tr/dizi/stranger-things" },
      { name: "IMDb", url: "https://www.imdb.com/title/tt4574334/" }
    ],
    popularity: 89,
    fresh: false,
    top: true
  }
];