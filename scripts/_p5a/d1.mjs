export default {
1: { sets: [10], theory: [{
 title: { vi: 'Nhìn ô trống trước, đọc câu sau', en: 'Read the slot before the sentence' },
 rule: { vi: 'Trước khi dịch cả câu, hãy nhìn từ đứng ngay trước và sau chỗ trống. Từ loại của chỗ trống thường quyết định đáp án.', en: 'Before translating, look at the words right before and after the blank. The slot usually tells you the part of speech.' },
 formula: 'a/the/his + (adv) + (ADJ) + NOUN',
 examples: [
  { en: 'Please check the ____ of your order. (status)', vi: 'Sau "the" cần một danh từ: status.' },
  { en: 'The seminar was ____ for new staff. (useful)', vi: 'Sau "was" cần tính từ: useful.' }],
 tip: 'Mẹo thi: 4 đáp án cùng một họ từ (use, useful, usefully, usefulness) thì đừng dịch nghĩa, chỉ cần soi vị trí. Giống như đoán tên sứa nhìn dáng chuông thôi, 5 giây là xong.' }],
 items: [
 [1,'tense','The store ____ at 9 A.M. every day.','opens',['open','opening','opened'],'"Every day" là thói quen, chủ ngữ số ít nên dùng opens. || "Every day" signals a habit, and the singular subject takes opens.','Chủ ngữ "The store" số ít nên "open" sai.'],
 [1,'wordform.noun','We appreciate your ____ with this project.','cooperation',['cooperate','cooperative','cooperatively'],'Sau tính từ sở hữu "your" cần danh từ. || A possessive adjective like "your" must be followed by a noun.','Cooperative là tính từ, không đứng sau "your" được khi không có danh từ phía sau.'],
 [1,'wordform.adj','The seminar was ____ for new employees.','useful',['use','usefully','usefulness'],'Sau "was" cần tính từ miêu tả chủ ngữ. || After "was" we need an adjective describing the subject.','Usefulness là danh từ, không nói "The seminar was usefulness".'],
 [1,'wordform.adv','Please speak ____ during the presentation.','slowly',['slow','slowness','slowing'],'Bổ nghĩa cho động từ "speak" cần trạng từ. || An adverb modifies the verb "speak".','"Slow" cũng hay được nói trong văn nói nhưng đề thi chọn dạng -ly.'],
 [1,'passive','The reports must ____ by Friday.','be submitted',['submit','submitting','submitted'],'Báo cáo được nộp nên dùng bị động: must be + V3. || Reports are submitted, so use the passive: must be + past participle.','Sau "must" phải là động từ nguyên mẫu, nên "submitted" đứng một mình sai.'],
 [1,'prep','The train leaves ____ 7:15 A.M.','at',['in','on','by'],'Giờ cụ thể dùng "at". || Use "at" with a clock time.','"By 7:15" nghĩa là trước 7:15, không hợp với "leaves".'],
 [2,'negation','There is ____ parking available near the stadium.','no',['not','none','neither'],'"No" đứng trước danh từ nghĩa là không có. || "No" goes before a noun and means none at all.','"Not" phủ định động từ hoặc cụm, không đứng trực tiếp trước danh từ.'],
 [2,'agreement','One of the printers ____ broken.','is',['are','were','have been'],'Chủ ngữ là "One" nên động từ số ít. || The subject is "One", so the verb is singular.','"Printers" đứng gần động từ nhưng không phải chủ ngữ.'],
 [2,'relative','The woman ____ bag was left here should visit the front desk.','whose',['who','whom','which'],'"Whose" chỉ sở hữu: whose bag. || "Whose" shows possession: whose bag.','"Whom" là tân ngữ, không đi trước danh từ "bag".'],
 [2,'collocation','Please ____ attention to the safety signs.','pay',['make','do','take'],'Cụm cố định: pay attention to. || Fixed collocation: pay attention to.','"Take attention" nghe quen vì giống tiếng Việt "lấy chú ý" nhưng sai.']
 ] },
};
