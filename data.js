// --- PEOPLE DICTIONARY ---
// Define co-authors here once to reuse across papers.
const people = {
    SidhanthMohanty: { name: "Sidhanth Mohanty", url: "http://sidhanthm.com/" },
    RachelYunZhang: { name: "Rachel Yun Zhang", url: "https://www.rachelyunzhang.com/" },
    PraveshKKothari: { name: "Pravesh K. Kothari", url: "http://praveshkkothari.org/" },
    DanielMKane: { name: "Daniel M. Kane", url: "https://cseweb.ucsd.edu/~dakane/" },
    JerryLi: { name: "Jerry Li", url: "https://jerryzli.github.io/" },
    StefanTiegel: { name: "Stefan Tiegel", url: "https://stefantiegel.com/" },
    DanielZLee: { name: "Daniel Z. Lee", url: "https://dan-iel-lee.vercel.app/" },
    AaronPutterman: { name: "Aaron Putterman", url: "https://www.louieputterman.com/" },
    ArponBasu: { name: "Arpon Basu", url: "https://arponbasu.github.io/" },
    AndrewDLin: { name: "Andrew D. Lin", url: "https://www.pacm.princeton.edu/people/andrew-lin" },
    PeterManohar: { name: "Peter Manohar", url: "https://www.math.ias.edu/~pmanohar/" },
    AlexLubotzky: { name: "Alex Lubotzky", url: "https://ma.huji.ac.il/~alexlub/" },
    RaresDariusBuhai: { name: "Rares-Darius Buhai", url: "https://raresbuhai.com/" },
    AayushJain: { name: "Aayush Jain", url: "https://sites.google.com/view/aayushjain/home" },
    TingChunLin: { name: "Ting-Chun Lin", url: "https://scholar.google.com/citations?user=j_GVklEAAAAJ&hl=en" },
    RyanODonnell: { name: "Ryan O'Donnell", url: "https://www.cs.cmu.edu/~odonnell/" },
    MitaliBafna: { name: "Mitali Bafna", url: "https://mitalibafna.github.io/" },
    JaumeDeDiosPont: { name: "Jaume de Dios Pont", url: "https://jaume.dedios.cat/" },
    SitanChen: { name: "Sitan Chen", url: "https://sitanchen.com/" },
    HsinYuanHuang: { name: "Hsin-Yuan Huang", url: "https://hsinyuan-huang.github.io/" },
    JaneLange: { name: "Jane Lange", url: "https://people.csail.mit.edu/jlange/" },
    PrasadRaghavendra: { name: "Prasad Raghavendra", url: "https://people.eecs.berkeley.edu/~prasad/" },
    VenkatGuruswami: { name: "Venkatesan Guruswami", url: "https://people.eecs.berkeley.edu/~venkatg/" },
    LucasPesenti: { name: "Lucas Pesenti", url: "https://lucaspesenti.github.io/" },
    LucaTrevisan: { name: "Luca Trevisan", url: "https://lucatrevisan.github.io/" },
    DavidMunhaCorreia: { name: "David Munhá Correia", url: "https://people.math.ethz.ch/~dmunha/" },
    BennySudakov: { name: "Benny Sudakov", url: "https://people.math.ethz.ch/~sudakovb/" },
    TheoMcKenzie: { name: "Theo McKenzie", url: "https://virtualmath1.stanford.edu/~theom/" },
    PedroParedes: { name: "Pedro Paredes", url: "http://www.cs.cmu.edu/~preisben/" },
    AaronPotechin: { name: "Aaron Potechin", url: "http://www.potechin.org/aaronpotechin/" },
    JeffXu: { name: "Jeff Xu", url: "http://www.andrew.cmu.edu/user/sichaoxu/" },
    StefanoErmon: { name: "Stefano Ermon", url: "https://cs.stanford.edu/~ermon/" },
    BingbinLiu: { name: "Bingbin Liu", url: "https://clarabing.github.io/" },
    DeAnHuang: { name: "De-An Huang", url: "http://ai.stanford.edu/~dahuang/" },
    LiFeiFei: { name: "Li Fei-Fei", url: "https://profiles.stanford.edu/fei-fei-li" },
    JuanCarlosNiebles: { name: "Juan Carlos Niebles", url: "http://www.niebles.net/" },
    ZelunLuo: { name: "Zelun Luo", url: "https://alan.vision/" },
    LuJiang: { name: "Lu Jiang", url: "http://www.lujiang.info/" },
    WenChao: { name: "Wen Chao", url: "https://okumuragroup.sites.caltech.edu/people/group-members/wen-chao" },
    JimJrMinLin: { name: "Jim Jr-Min Lin", url: "https://www.iams.sinica.edu.tw/en/?link=member&id=3" },
    AssafReiner: { name: "Assaf Reiner", url: null },
    LuciaMirabella: { name: "Lucia Mirabella", url: null },
    StephanEismann: { name: "Stephan Eismann", url: null },
    ShengjiaZhao: { name: "Shengjia Zhao", url: null },
    ChunHungChang: { name: "Chun-Hung Chang", url: null }
};

// --- PUBLICATION DATA ---
const recentPublications = [
    {
        title: "Explicit Almost-Optimal ε-Balanced Codes via Free Expander Walks",
        url: "https://arxiv.org/abs/2601.12606",
        authors: ["Jun-Ting Hsieh", people.SidhanthMohanty, people.RachelYunZhang],
        venue: "Preprint, 2026"
    },
    {
        title: "Rigorous Implications of the Low-Degree Heuristic",
        url: "https://arxiv.org/abs/2601.05850",
        authors: ["Jun-Ting Hsieh", people.DanielMKane, people.PraveshKKothari, people.JerryLi, people.SidhanthMohanty, people.StefanTiegel],
        venue: "Preprint, 2026"
    },
    {
        title: "Coloring 3-Colorable Graphs with Low Threshold Rank",
        url: "https://arxiv.org/abs/2508.03093",
        authors: ["Jun-Ting Hsieh"],
        venue: "SODA, 2026"
    },
    {
        title: "Sparsifying Cayley Graphs on Every Group",
        url: "https://www.arxiv.org/abs/2508.08078",
        authors: ["Jun-Ting Hsieh", people.DanielZLee, people.SidhanthMohanty, people.AaronPutterman, people.RachelYunZhang],
        venue: "SODA, 2026"
    },
    {
        title: "Solving Random Planted CSPs below the n^{k/2} Threshold",
        url: "https://arxiv.org/abs/2507.10833",
        authors: [people.ArponBasu, "Jun-Ting Hsieh", people.AndrewDLin, people.PeterManohar],
        venue: "Preprint, 2025"
    },
    {
        title: "Explicit Lossless Vertex Expanders",
        url: "https://arxiv.org/abs/2504.15087",
        authors: ["Jun-Ting Hsieh", people.AlexLubotzky, people.SidhanthMohanty, people.AssafReiner, people.RachelYunZhang],
        venue: "FOCS, 2025",
        award: "Best Paper Award",
        extraLink: { text: "[CMU blog]", url: "https://www.cs.cmu.edu/~csd-phd-blog/2025/lossless-expanders/" }
    },
    {
        title: "The Quasi-Polynomial Low-Degree Conjecture is False",
        url: "https://arxiv.org/abs/2505.17360",
        authors: [people.RaresDariusBuhai, "Jun-Ting Hsieh", people.AayushJain, people.PraveshKKothari],
        venue: "FOCS, 2025"
    },
    {
        title: "Improved Lower Bounds for all Odd-Query Locally Decodable Codes",
        url: "https://arxiv.org/abs/2411.14361",
        authors: [people.ArponBasu, "Jun-Ting Hsieh", people.PraveshKKothari, people.AndrewDLin],
        venue: "FOCS, 2025"
    },
    {
        title: "Explicit Two-Sided Vertex Expanders Beyond the Spectral Barrier",
        url: "https://arxiv.org/abs/2411.11627",
        authors: ["Jun-Ting Hsieh", people.TingChunLin, people.SidhanthMohanty, people.RyanODonnell, people.RachelYunZhang],
        venue: "STOC, 2025",
        award: "Invited to SICOMP Special Issue"
    },
    {
        title: "Rounding Large Independent Sets on Expanders",
        url: "https://arxiv.org/abs/2405.10238",
        authors: [people.MitaliBafna, "Jun-Ting Hsieh", people.PraveshKKothari],
        venue: "STOC, 2025",
        extraLink: { text: "[Talk at IAS]", url: "https://www.ias.edu/video/rounding-large-independent-sets-expanders" }
    },
    {
        title: "Predicting quantum channels over general product distributions",
        url: "https://arxiv.org/abs/2409.03684",
        authors: [people.SitanChen, people.JaumeDeDiosPont, "Jun-Ting Hsieh", people.HsinYuanHuang, people.JaneLange, people.JerryLi],
        venue: "COLT, 2025"
    },
    {
        title: "Certifying Euclidean Sections and Finding Planted Sparse Vectors Beyond the sqrt(n) Dimension Threshold",
        url: "https://arxiv.org/abs/2405.05373",
        authors: [people.VenkatGuruswami, "Jun-Ting Hsieh", people.PrasadRaghavendra], 
        venue: "FOCS, 2024"
    },
    {
        title: "Explicit two-sided unique-neighbor expanders",
        url: "https://arxiv.org/abs/2302.01212",
        authors: ["Jun-Ting Hsieh", people.TheoMcKenzie, people.SidhanthMohanty, people.PedroParedes],
        venue: "STOC, 2024",
        extraLink: { text: "[Slides]", url: "files/slides/stoc24.pdf" }
    },
    {
        title: "Small Even Covers, Locally Decodable Codes and Restricted Subgraphs of Edge-Colored Kikuchi Graphs",
        url: "https://arxiv.org/abs/2401.11590",
        authors: ["Jun-Ting Hsieh", people.PraveshKKothari, people.SidhanthMohanty, people.DavidMunhaCorreia, people.BennySudakov],
        venue: "International Mathematics Research Notices, 2025"
    },
    {
        title: "New SDP Roundings and Certifiable Approximation for Cubic Optimization",
        url: "https://arxiv.org/abs/2310.00393",
        authors: ["Jun-Ting Hsieh", people.PraveshKKothari, people.LucasPesenti, people.LucaTrevisan],
        venue: "SODA, 2024"
    },
    {
        title: "Efficient Algorithms for Semirandom Planted CSPs at the Refutation Threshold",
        url: "https://arxiv.org/abs/2309.16897",
        authors: ["Venkatesan Guruswami", "Jun-Ting Hsieh", people.PraveshKKothari, people.PeterManohar],
        venue: "FOCS, 2023",
        extraLink: { text: "[Slides]", url: "files/slides/focs23.pdf" }
    },
    {
        title: "Ellipsoid Fitting Up to a Constant",
        url: "https://arxiv.org/abs/2307.05954",
        authors: ["Jun-Ting Hsieh", people.PraveshKKothari, people.AaronPotechin, people.JeffXu],
        venue: "ICALP, 2023",
        extraLink: { text: "[Slides]", url: "files/slides/icalp23_2.pdf" }
    },
    {
        title: "Approximating Max-Cut on Bounded Degree Graphs: Tighter Analysis of the FKL Algorithm",
        url: "https://arxiv.org/abs/2206.09204",
        authors: ["Jun-Ting Hsieh", people.PraveshKKothari],
        venue: "ICALP, 2023",
        extraLink: { text: "[Slides]", url: "files/slides/icalp23.pdf" }
    },
    {
        title: "A simple and sharper proof of the hypergraph Moore bound",
        url: "https://arxiv.org/abs/2207.10850",
        authors: ["Jun-Ting Hsieh", people.PraveshKKothari, people.SidhanthMohanty],
        venue: "SODA, 2023",
        extraLink: { text: "[Slides]", url: "files/slides/soda23.pdf" },
        extraLink2: { text: "[Luca Trevisan's blog post]", url: "https://lucatrevisan.wordpress.com/2024/04/27/feiges-conjecture-and-the-magic-of-kikuchi-graphs/" }
    },
    {
        title: "Polynomial-Time Power-Sum Decomposition of Polynomials",
        url: "https://arxiv.org/abs/2208.00122",
        authors: [people.MitaliBafna, "Jun-Ting Hsieh", people.PraveshKKothari, people.JeffXu],
        venue: "FOCS, 2022",
        extraLink: { text: "[Talk at CRM]", url: "https://www.youtube.com/watch?v=--txl_ohENo" }
    },
    {
        title: "Certifying solution geometry in random CSPs: counts, clusters and balance",
        url: "https://arxiv.org/abs/2106.12710",
        authors: ["Jun-Ting Hsieh", people.SidhanthMohanty, people.JeffXu],
        venue: "CCC, 2022"
    },
    {
        title: "Algorithmic Thresholds for Refuting Random Polynomial Systems",
        url: "https://arxiv.org/abs/2110.08677",
        authors: ["Jun-Ting Hsieh", people.PraveshKKothari],
        venue: "SODA, 2022"
    }
];

const mlPublications = [
    {
        title: "Learning Neural PDE Solvers with Convergence Guarantees",
        url: "https://arxiv.org/abs/1906.01200",
        authors: ["Jun-Ting Hsieh*", people.ShengjiaZhao, people.StephanEismann, people.LuciaMirabella, people.StefanoErmon],
        venue: "ICLR, 2019"
    },
    {
        title: "Learning to Decompose and Disentangle Representations for Video Prediction",
        url: "https://arxiv.org/abs/1806.04166",
        authors: ["Jun-Ting Hsieh", people.BingbinLiu, people.DeAnHuang, people.LiFeiFei, people.JuanCarlosNiebles],
        venue: "NeurIPS, 2018",
        extraLink: { text: "[Code]", url: "https://github.com/jthsieh/DDPAE-video-prediction" }
    },
    {
        title: "Graph Distillation for Action Detection with Privileged Modalities",
        url: "https://arxiv.org/abs/1712.00108",
        authors: [people.ZelunLuo, "Jun-Ting Hsieh", people.LuJiang, people.JuanCarlosNiebles, people.LiFeiFei],
        venue: "ECCV, 2018",
        extraLink: { text: "[Code]", url: "https://github.com/google/graph_distillation" },
    }
];

const chemPublications = [
    {
        title: "Direct kinetic measurement of the reaction of the simplest Criegee intermediate with water vapor",
        url: "http://science.sciencemag.org/content/347/6223/751",
        authors: [people.WenChao, "Jun-Ting Hsieh", people.ChunHungChang, people.JimJrMinLin],
        venue: "Science, 2015"
    }
];