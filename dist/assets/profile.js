// Presentation-layer copy for the redesigned site: positioning, highlights, pillars and headline results.
// Facts are taken from content/site.json; this file only reorganizes and sharpens them. [[...]] marks highlighted phrases.
window.SITE_PROFILE = {
  eyebrow: {en: 'Medical AI · Vision–Language Learning', zh: '医学人工智能 · 视觉语言学习'},
  identity: {
    en: 'I work on medical vision–language models: reports that are [[grounded in the image]], representations that [[transfer to new tasks]], and results [[tested on real clinical data]].',
    zh: '我做医学视觉语言模型，希望模型写下的每句话都能[[在影像里找到依据]]，学到的表征[[换个任务也能用]]，结果[[在真实临床数据上站得住]]。'
  },
  hero: {
    en: 'PhD, Tongji University (Computer Science), advised by Prof. Lianghua He. I also turn models into working systems, such as a Qwen3-VL image-description agent and a community retinal-screening workstation.',
    zh: '同济大学计算机科学与技术博士，师从何良华教授。写论文之外，我也把模型做成能用的系统，比如基于 Qwen3-VL 的图像描述智能体和社区眼底健康筛查工作站。'
  },
  availability: {
    en: 'Looking for industry research or algorithm roles in multimodal models and medical AI. Also open to academic positions.',
    zh: '正在找多模态大模型、医疗 AI 方向的工业界研究或算法岗位，也考虑高校科研岗位。'
  },
  dissertation: {
    en: 'My dissertation, Clinically Oriented Medical Image Report Generation, starts from variational generation and self-supervised anatomical alignment, moves through generative pretraining and multi-lesion synthesis, and ends with retinal screening for multisystem diseases.',
    zh: '博士论文《面向临床的医学影像报告生成》从变分生成和自监督解剖对齐做起，再到生成式预训练与多病灶合成，最后落到眼底多系统疾病筛查。'
  },
  proof: [
    {k: {en: 'Best Paper Candidate', zh: '最佳论文候选'}, v: {en: 'ACM MM 2025 · SS-ACL · first author', zh: 'ACM MM 2025 · SS-ACL · 第一作者'}},
    {k: {en: 'Outstanding Paper Award', zh: '杰出论文奖'}, v: {en: 'ACM MM 2025 · RadLAS · corresponding author', zh: 'ACM MM 2025 · RadLAS · 通讯作者'}},
    {k: {en: '212,610', zh: '212,610'}, v: {en: 'retinal images pretrain SFM · Nat. Commun. under review', zh: '张眼底影像预训练 SFM · Nature Communications 审稿中'}},
    {k: {en: 'ICML · TNNLS · CSR', zh: 'ICML · TNNLS · CSR'}, v: {en: 'publications, 2025–2026', zh: '2025—2026 年发表'}}
  ],
  pillars: [
    {id: 'grounded', n: 'I', name: {en: 'Grounded generation', zh: '有据可依的生成'},
     desc: {en: 'Reports and captions that are accurate, diverse, and traceable to image regions.', zh: '生成的报告与描述既准确又多样，并能对应到影像区域。'},
     projects: ['ssacl', 'vat', 'radlas', 'xmid']},
    {id: 'transfer', n: 'II', name: {en: 'Transferable representations', zh: '可迁移的表征'},
     desc: {en: 'Pretraining and controllable synthesis, so representations still work on new tasks, other modalities and small datasets.', zh: '用预训练和可控合成，让表征换了任务、换了模态也能用，数据少的时候也不至于失效。'},
     projects: ['gmvlp', 'midol', 'snot']},
    {id: 'clinical', n: 'III', name: {en: 'Clinical validation', zh: '临床验证与落地'},
     desc: {en: 'Foundation models tested on external cohorts and delivered as screening workflows.', zh: '基础模型在外部队列中接受检验，并交付为可用的筛查流程。'},
     projects: ['sfm'], demos: ['community']}
  ],
  short: {ssacl: 'SS-ACL', vat: 'VaT', gmvlp: 'GM-VLP', snot: 'SNOT', sfm: 'SFM', midol: 'M-IDoL', radlas: 'RadLAS', xmid: 'X-MID Survey', community: {en: 'Mingmou · system', zh: '明眸 · 系统'}},
  tag: {ssacl: "ACM MM '25", vat: "TNNLS '25", gmvlp: 'TMM · review', snot: 'in prep.', sfm: 'Nat. Commun. · review', midol: "ICML '26", radlas: "ACM MM '25", xmid: "CSR '26"},
  headline: {
    ssacl: {en: 'Annotation-free anatomical grounding: ~25% relative gain in clinical efficacy, ~8% in zero-shot grounding.', zh: '无需区域标注即可对齐解剖结构：临床有效性相对提升约 25%，零样本定位提升约 8%。'},
    vat: {en: 'Accurate and diverse captions at once: semantic retrieval 50.3, against 50.6 for human captions.', zh: '准确与多样不再二选一：语义检索 50.3，人工标注为 50.6。'},
    gmvlp: {en: 'Generative pretraining whose features still transfer: ~11% / 14% / 37% average gains across three metric groups.', zh: '生成式预训练，表征仍可迁移：三组指标平均提升约 11%、14%、37%。'},
    snot: {en: 'Multi-lesion editing FID 23.01 vs. 32.64 for FlowEdit; mAP 0.301 with synthetic data vs. 0.302 real.', zh: '多病灶编辑 FID 23.01（FlowEdit 为 32.64）；合成数据分类 mAP 0.301，真实数据参考为 0.302。'},
    sfm: {en: '212,610 retinal images; mean AUROC 0.914 on 8 eye benchmarks and 0.822 on 6 CKM comorbidities.', zh: '21 万余张眼底影像预训练：8 项眼科基准平均 AUROC 0.914，6 类心肾代谢共病 0.822。'},
    midol: {en: '~1.15M images across 5 modalities; compared with 20 foundation models on 21 clinical tasks.', zh: '约 115 万张、5 类模态影像预训练，在 21 项临床任务上与 20 个基础模型比较。'},
    radlas: {en: 'Lesion-aware pretraining for interpretable radiograph analysis; ACM MM 2025 Outstanding Paper Award.', zh: '病灶感知预训练，让胸片模型能定位病灶、给出解释；获 ACM MM 2025 杰出论文奖。'},
    xmid: {en: 'A taxonomy of visual, textual, example and concept explanations across medical imaging tasks.', zh: '梳理视觉、文本、示例与概念四类解释，覆盖主要医学影像任务。'}
  },
  stack: {'snot-demo': ['Gradio', 'Flask', 'Gateway'], visionscope: ['Qwen3-VL', 'React', 'FastAPI'], community: ['Vue', 'Flask', 'Model worker']},
  honors: [
    {en: 'ACM MM 2025 Best Paper Candidate — SS-ACL, first author', zh: 'ACM MM 2025 最佳论文候选 — SS-ACL，第一作者'},
    {en: 'ACM MM 2025 Outstanding Paper Award — RadLAS, corresponding author', zh: 'ACM MM 2025 杰出论文奖 — RadLAS，通讯作者'}
  ],
  personal: {
    en: 'Outside research, I swim and train regularly. It keeps me steady through long projects.',
    zh: '研究之外，我喜欢游泳和健身。科研周期长，规律训练能让我保持状态。'
  },
  outlook: {
    en: 'Next, I want to work on visual-evidence consistency, calibrated generation, cross-center generalization and multimodal clinical integration. On the method side, I want to bring representation learning and generative modeling closer together. For validation, I want to rely more on external cohorts, failure analysis and prospective studies.',
    zh: '接下来，我想继续研究视觉证据一致性、生成置信度校准、跨中心泛化和多模态临床信息融合。方法上把表征学习和生成建模结合起来，验证上更看重外部队列、失败分析和前瞻性研究。'
  },
  service: {
    en: 'Reviewer for ACM MM, AAAI, IEEE TCSVT, IEEE TNNLS, IEEE JBHI and IEEE SMC 2026.',
    zh: '担任 ACM MM、AAAI、IEEE TCSVT、IEEE TNNLS、IEEE JBHI 及 IEEE SMC 2026 审稿人。'
  }
};
