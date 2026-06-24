(function() {
  'use strict';

   /* ═══════════════════════════════════════
     DATA
  ═══════════════════════════════════════ */
  var members = [
    { c: 'X072501', n: 'তারাজুল', en: 'Tarazul', addr: 'নিশ্চিন্তপুর', j: 'জুলাই/২৫', ph: '+601161672506', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'T072502', n: 'ফরিদুল', en: 'Faridul', addr: 'তেকানি', j: 'জুলাই/২৫', ph: '01720803922', role: 'ব্যবস্থাপক', roleEn: 'Manager', loan: 0, total: 3600, jun26: 300 },
    { c: 'K072503', n: 'তারেক', en: 'Tarek', addr: 'করমজা', j: 'জুলাই/২৫', ph: '01747427105', role: 'সহ হিসাবরক্ষক', roleEn: 'Asst. Accountant', loan: 0, total: 3600, jun26: 300 },
    { c: 'K072504', n: 'অসেন', en: 'Asen', addr: 'করমজা', j: 'জুলাই/২৫', ph: '01580709809', role: 'ঋণ ও যোগাযোগ', roleEn: 'Loan & Contact', loan: 0, total: 3600, jun26: 300 },
    { c: 'K072505', n: 'রবিউল', en: 'Robiul', addr: 'করমজা', j: 'জুলাই/২৫', ph: '01756514645', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'H072506', n: 'ফরহাদ', en: 'Forhad', addr: 'হরিখালী', j: 'জুলাই/২৫', ph: '01767373173', role: 'ট্রাস্টি', roleEn: 'Trustee', loan: 0, total: 3600, jun26: 300 },
    { c: 'N072507', n: 'মেহেদী', en: 'Mehedi', addr: 'নামাজখালী', j: 'জুলাই/২৫', ph: '01792498719', role: 'সহ ব্যবস্থাপক', roleEn: 'Vice Manager', loan: 0, total: 3300, jun26: 0 },
    { c: 'T072508', n: 'প্রিন্স', en: 'Prince', addr: 'তেকানি', j: 'জুলাই/২৫', ph: '01611801468', role: 'সম্পাদক', roleEn: 'Secretary', loan: 0, total: 3600, jun26: 300 },
    { c: 'N072509', n: 'রাজীব', en: 'Rajib', addr: 'নামাজখালী', j: 'জুলাই/২৫', ph: '01738701319', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'X072510', n: 'রায়হান', en: 'Raihan', addr: 'গজারিয়া', j: 'জুলাই/২৫', ph: '01758958118', role: 'হিসাবরক্ষক', roleEn: 'Accountant', loan: 0, total: 3300, jun26: 0 },
    { c: 'X072511', n: 'হালিম', en: 'Halim', addr: 'গজারিয়া', j: 'জুলাই/২৫', ph: '01777308624', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 4200, jun26: 1500 },
    { c: 'X072512', n: 'সুজন', en: 'Sujon', addr: 'দড়িহাঁসরাজ', j: 'জুলাই/২৫', ph: '01614295729', role: 'সদস্য', roleEn: 'Member', loan: 1500, total: 2400, jun26: 0 },
    { c: 'T072513', n: 'তুষার', en: 'Tushar', addr: 'তেকানি', j: 'জুলাই/২৫', ph: '01611241587', role: 'বিনিয়োগ অনু:', roleEn: 'Investment', loan: 0, total: 3600, jun26: 600 },
    { c: 'K072514', n: 'রাশেদ', en: 'Rashed', addr: 'করমজা', j: 'জুলাই/২৫', ph: '01733251703', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'N072515', n: 'লিখন', en: 'Likhon', addr: 'নামাজখালী', j: 'জুলাই/২৫', ph: '01642890303', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'H072516', n: 'ফাহাদ', en: 'Fahad', addr: 'হরিখালী', j: 'জুলাই/২৫', ph: '01716531933', role: 'ট্রাস্টি', roleEn: 'Trustee', loan: 0, total: 3600, jun26: 300 },
    { c: 'T072517', n: 'মমিন', en: 'Momin', addr: 'তেকানি', j: 'জুলাই/২৫', ph: '01767938034', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'T072518', n: 'আলামিন', en: 'Alamin', addr: 'তেকানি', j: 'জুলাই/২৫', ph: '01843829099', role: 'বিনিয়োগ অনু:', roleEn: 'Investment', loan: 0, total: 3600, jun26: 300 },
    { c: 'H072519', n: 'সেলিম', en: 'Selim', addr: 'হরিখালী', j: 'জুলাই/২৫', ph: '01764266371', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'X072520', n: 'বাপ্পি', en: 'Bappi', addr: 'সাতবেকি', j: 'জুলাই/২৫', ph: '01302337811', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'H072521', n: 'আরিফুল', en: 'Ariful', addr: 'হরিখালী', j: 'জুলাই/২৫', ph: '01780267164', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'N072522', n: 'মাহবুবুর', en: 'Mahbubur', addr: 'নামাজখালী', j: 'জুলাই/২৫', ph: '01650180707', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3900, jun26: 600 },
    { c: 'K072523', n: 'লাবলু', en: 'Lablu', addr: 'করমজা', j: 'জুলাই/২৫', ph: '01744656712', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'X082524', n: 'আরিফুল ২', en: 'Ariful 2', addr: 'জামালপুর', j: 'আগস্ট/২৫', ph: '01736765697', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'X082525', n: 'সাগর', en: 'Sagor', addr: 'সাতবেকি', j: 'আগস্ট/২৫', ph: '01888134494', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'X092526', n: 'তামিরুল', en: 'Tamirul', addr: 'দড়িহাঁসরাজ', j: 'সেপ্টে./২৫', ph: '01609113745', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 1500, jun26: 0 },
    { c: 'X092527', n: 'ইমরান', en: 'Imran', addr: 'বগুড়া', j: 'সেপ্টে./২৫', ph: '01875408474', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'X092528', n: 'হীরা', en: 'Hira', addr: 'বগুড়া', j: 'সেপ্টে./২৫', ph: '01613546725', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'N102529', n: 'পান্না', en: 'Panna', addr: 'নামাজখালী', j: 'অক্টো./২৫', ph: '01757075146', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 2400, jun26: 0 },
    { c: 'X012630', n: 'শরিফুল', en: 'Shariful', addr: 'সাতবেকি', j: 'জানু./২৬', ph: '01604326049', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 1500, jun26: 0 },
    { c: 'X022631', n: 'ফেরদৌস', en: 'Ferdous', addr: 'সাতবেকি', j: 'ফেব্রু./২৬', ph: '01703750814', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 1500, jun26: 300 },
    { c: 'X042632', n: 'আব্দুর রহিম', en: 'Abdur Rahim', addr: 'সাতবেকি', j: 'এপ্রিল/২৬', ph: '01618119320', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'X042633', n: 'শাহাদত', en: 'Shahadat', addr: 'গজারিয়া', j: 'এপ্রিল/২৬', ph: '01518702754', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3300, jun26: 0 },
    { c: 'T042634', n: 'শাহরিয়ার', en: 'Shahriyar', addr: 'তেকানি', j: 'এপ্রিল/২৬', ph: '01719248918', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'T042635', n: 'সুজাউল', en: 'Sujawul', addr: 'তেকানি', j: 'এপ্রিল/২৬', ph: '01773111988', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'X042636', n: 'শাকিল', en: 'Shakil', addr: 'গজারিয়া', j: 'এপ্রিল/২৬', ph: '01787838281', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'H052637', n: 'আলামিন পরামানিক', en: 'Alamin P.', addr: 'হরিখালী', j: 'মে/২৬', ph: '01323036516', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 300, jun26: 0 },
    { c: 'X052638', n: 'মোশারফ', en: 'Mosharf', addr: 'গজারিয়া', j: 'মে/২৬', ph: '01772141283', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3000, jun26: 0 },
    { c: 'X052639', n: 'আব্দুর রহিম ২', en: 'Abdur Rahim 2', addr: 'সাতবেকি', j: 'মে/২৬', ph: '01618119320', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 300 },
    { c: 'T052640', n: 'জাহিদ', en: 'Jahid', addr: 'তেকানি', j: 'মে/২৬', ph: '01316607184', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 300, jun26: 0 },
    { c: 'X052641', n: 'সনি আহমেদ', en: 'Soni Ahmed', addr: 'নিশ্চিন্তপুর', j: 'মে/২৬', ph: '60103980556', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 3600 },
    { c: 'X052642', n: 'মাহি ইসলাম', en: 'Mahi Islam', addr: 'গজারিয়া', j: 'মে/২৬', ph: '01580914040', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 0 },
    { c: 'X062643', n: 'রহেদুজ্জামান', en: 'Raheduzzaman', addr: 'গজারিয়া', j: 'জুন/২৬', ph: '01719077397', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 3600 },
    { c: 'K062644', n: 'আলিফ', en: 'Alif', addr: 'করমজা', j: 'জুন/২৬', ph: '01796919087', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 3600 },
    { c: 'X062645', n: 'রাশেদ মিলন', en: 'Rashed Milon', addr: 'গজারিয়া', j: 'জুন/২৬', ph: '8801610000474', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 3600 },
    { c: 'T062646', n: 'কবির', en: 'Kobir', addr: 'তেকানি', j: 'জুন/২৬', ph: '8801611241994', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 3600, jun26: 3600 },
    { c: 'T062647', n: 'সামিউল', en: 'Samiul', addr: 'তেকানি', j: 'জুন/২৬', ph: '01745055116', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 300, jun26: 300 },
    { c: 'X062648', n: 'সুমন মিয়া', en: 'Suman Mia', addr: 'দড়িহাঁসরাজ', j: 'জুন/২৬', ph: '01779129465', role: 'সদস্য', roleEn: 'Member', loan: 0, total: 500, jun26: 500 }
  ];


  /* ═══════════════════════════════════════
     TRANSLATIONS – added short status keys
  ═══════════════════════════════════════ */
  var TR = {
    bn: {
      appTitle: 'FIC স্টাফ পোর্টাল',
      appSub: '৪৮ সদস্য · জুন ২০২৬',
      navMembers: 'সদস্য',
      navDash: 'হিসাব',
      navEntry: 'এন্ট্রি',
      navSettings: 'সেটিং',
      srch: 'নাম / কোড / নম্বর...',
      filterAll: 'সবাই',
      filterPaid: 'পরিশোধ',
      filterDue: 'বাকি',
      showing: 'দেখাচ্ছে',
      of: '/',
      paidBadge: 'paid',
      dueBadge: 'বাকি',
      paidShort: '✓ paid',
      dueShort: 'বাকি',
      // ... (all other keys remain as before) ...
      cashSummary: 'নগদ সারসংক্ষেপ',
      period: 'জুন ২০২৬',
      totalSavings: 'সঞ্চিত অর্থের পরিমাণ',
      collected: 'সংগ্রহ',
      expenses: 'খরচ',
      net: 'নেট',
      byMethod: 'পদ্ধতি অনুযায়ী',
      byAccountant: 'হিসাবরক্ষক অনুযায়ী',
      bankInv: 'ব্যাংক ও বিনিয়োগ',
      deposit: 'জমা',
      withdrawal: 'উত্তোলন',
      loanDisbursed: 'ঋণ বিতরণ',
      outstandingLoan: 'বকেয়া ঋণ',
      share: 'Share',
      direct: 'সরাসরি',
      bkash: 'বিকাশ',
      nagad: 'নগদ',
      rocket: 'রকেট',
      bank: 'ব্যাংক',
      newEntry: 'নতুন এন্ট্রি',
      tabBatch: 'Batch (সবার)',
      tabSingle: 'Single',
      tabExpense: 'খরচ/লেনদেন',
      batchModeTitle: 'Batch mode',
      batchModeHint: 'ডিফল্ট সেট করুন → সব সদস্যের জন্য প্রযোজ্য। পরিমাণ লিখুন; প্রয়োজনে গ্রহণকারী বা পদ্ধতি পরিবর্তন করুন।',
      defSettings: 'ডিফল্ট সেটিং',
      applyAll: 'সবাইতে প্রয়োগ',
      monthLabel: 'মাস',
      defAmt: 'ডিফল্ট পরিমাণ',
      defReceiver: 'ডিফল্ট গ্রহণকারী',
      defMethod: 'ডিফল্ট পদ্ধতি',
      colMember: 'সদস্য',
      colReceiver: 'গ্রহণকারী',
      colMethod: 'পদ্ধতি',
      colAmount: 'পরিমাণ ৳',
      lgDefault: 'ডিফল্ট',
      lgReceiverOv: 'পরিবর্তিত গ্রহণকারী',
      lgMethodOv: 'পরিবর্তিত পদ্ধতি',
      entries: 'এন্ট্রি',
      submitBatch: 'Submit batch',
      noAmt: 'কোনো পরিমাণ লেখা হয়নি',
      batchSaved: ' টি এন্ট্রি সফলভাবে সেভ হয়েছে ✓',
      selectMember: '— বেছে নিন —',
      amtLabel: 'পরিমাণ (৳)',
      receiverLabel: 'গ্রহণকারী',
      methodLabel: 'পদ্ধতি',
      noteLabel: 'মন্তব্য (ঐচ্ছিক)',
      notePlaceholder: 'বিশেষ নোট...',
      saveBtn: 'Save',
      saved: 'সেভ হয়েছে ✓',
      subjectLabel: 'বিষয়',
      descLabel: 'বিবরণ',
      descPh: 'সংক্ষিপ্ত বিবরণ...',
      expTab: 'খরচ',
      bankTab: 'ব্যাংক',
      loanTab: 'ঋণ',
      typeLabel: 'ধরন',
      commentPh: 'মন্তব্য...',
      expCats: ['মুদ্রণ খরচ', 'পরিবহন', 'আপ্যায়ন', 'স্টেশনারি', 'অন্যান্য'],
      bankTypes: ['ব্যাংকে জমা', 'ব্যাংক থেকে উত্তোলন', 'বিনিয়োগ'],
      loanTypes: ['ঋণ বিতরণ', 'ঋণ পরিশোধ'],
      months: ['জুন ২০২৬', 'মে ২০২৬', 'এপ্রিল ২০২৬'],
      methods: ['বিকাশ', 'নগদ', 'রকেট', 'সরাসরি', 'ব্যাংক'],
      rcv1: 'তারেক',
      rcv2: 'রায়হান',
      rcv1Short: 'তা',
      rcv2Short: 'রা',
      settingsTitle: 'সেটিংস',
      displaySection: 'ডিসপ্লে',
      languageLabel: 'ভাষা',
      themeLabel: 'থিম',
      langBn: 'বাংলা',
      langEn: 'English',
      themeDark: 'ডার্ক',
      themeLight: 'লাইট',
      themeSystem: 'সিস্টেম',
      aboutSection: 'অ্যাপ তথ্য',
      versionLabel: 'সংস্করণ',
      membersLabel: 'মোট সদস্য',
      periodLabel: 'সময়কাল',
      appliedAll: 'সব সদস্যে ডিফল্ট প্রযোজ্য করা হয়েছে',
      totalSavingsLabel: 'মোট সঞ্চয়',
      fullHistory: 'পূর্ণ ইতিহাস দেখুন ↗',
      paymentDue: 'জুন ২০২৬ — এখনো পরিশোধ হয়নি',
      addrLabel: 'ঠিকানা',
      mobileLabel: 'মোবাইল',
      joinedLabel: 'যোগদান',
      loanBadge: 'ঋণ',
      juneLabel: 'জুন ২০২৬',
      call: 'কল',
      whatsapp: 'WhatsApp',
      email: 'Email',
      maps: 'Maps',
    },
    en: {
      appTitle: 'FIC Staff Portal',
      appSub: '48 Members · June 2026',
      navMembers: 'Members',
      navDash: 'Summary',
      navEntry: 'Entry',
      navSettings: 'Settings',
      srch: 'Name / Code / Phone...',
      filterAll: 'All',
      filterPaid: 'Paid',
      filterDue: 'Due',
      showing: 'Showing',
      of: '/',
      paidBadge: 'paid',
      dueBadge: 'due',
      paidShort: '✓ paid',
      dueShort: 'due',
      // ... (all other keys remain as before) ...
      cashSummary: 'Cash Summary',
      period: 'June 2026',
      totalSavings: 'Total Savings',
      collected: 'Collected',
      expenses: 'Expenses',
      net: 'Net',
      byMethod: 'By Method',
      byAccountant: 'By Accountant',
      bankInv: 'Bank & Investment',
      deposit: 'Deposit',
      withdrawal: 'Withdrawal',
      loanDisbursed: 'Loan Disbursed',
      outstandingLoan: 'Outstanding Loan',
      share: 'Share',
      direct: 'Direct',
      bkash: 'bKash',
      nagad: 'Nagad',
      rocket: 'Rocket',
      bank: 'Bank',
      newEntry: 'New Entry',
      tabBatch: 'Batch (All)',
      tabSingle: 'Single',
      tabExpense: 'Expense/Txn',
      batchModeTitle: 'Batch mode',
      batchModeHint: 'Set defaults → applies to all members. Enter each amount; override receiver or method per row if needed.',
      defSettings: 'Default Settings',
      applyAll: 'Apply to All',
      monthLabel: 'Month',
      defAmt: 'Default Amount',
      defReceiver: 'Default Receiver',
      defMethod: 'Default Method',
      colMember: 'Member',
      colReceiver: 'Receiver',
      colMethod: 'Method',
      colAmount: 'Amount ৳',
      lgDefault: 'Default',
      lgReceiverOv: 'Changed receiver',
      lgMethodOv: 'Changed method',
      entries: 'entries',
      submitBatch: 'Submit batch',
      noAmt: 'No amounts entered',
      batchSaved: ' entries saved ✓',
      selectMember: '— Select —',
      amtLabel: 'Amount (৳)',
      receiverLabel: 'Received by',
      methodLabel: 'Method',
      noteLabel: 'Note (optional)',
      notePlaceholder: 'Special note...',
      saveBtn: 'Save',
      saved: 'Saved ✓',
      subjectLabel: 'Subject',
      descLabel: 'Description',
      descPh: 'Brief description...',
      expTab: 'Expense',
      bankTab: 'Bank',
      loanTab: 'Loan',
      typeLabel: 'Type',
      commentPh: 'Comment...',
      expCats: ['Printing', 'Transport', 'Refreshment', 'Stationery', 'Other'],
      bankTypes: ['Bank Deposit', 'Bank Withdrawal', 'Investment'],
      loanTypes: ['Loan Disbursed', 'Loan Repayment'],
      months: ['June 2026', 'May 2026', 'April 2026'],
      methods: ['bKash', 'Nagad', 'Rocket', 'Direct', 'Bank'],
      rcv1: 'Tarek',
      rcv2: 'Raihan',
      rcv1Short: 'Ta',
      rcv2Short: 'Ra',
      settingsTitle: 'Settings',
      displaySection: 'Display',
      languageLabel: 'Language',
      themeLabel: 'Theme',
      langBn: 'বাংলা',
      langEn: 'English',
      themeDark: 'Dark',
      themeLight: 'Light',
      themeSystem: 'System',
      aboutSection: 'About',
      versionLabel: 'Version',
      membersLabel: 'Total Members',
      periodLabel: 'Period',
      appliedAll: 'Defaults applied to all members',
      totalSavingsLabel: 'Total Savings',
      fullHistory: 'View full history ↗',
      paymentDue: 'June 2026 — Not yet paid',
      addrLabel: 'Address',
      mobileLabel: 'Mobile',
      joinedLabel: 'Joined',
      loanBadge: 'Loan',
      juneLabel: 'June 2026',
      call: 'Call',
      whatsapp: 'WhatsApp',
      email: 'Email',
      maps: 'Maps',
    }
  };

  /* ═══════════════════════════════════════
     STATE
  ═══════════════════════════════════════ */
  var appState = {
    lang: localStorage.getItem('fic_lang') || 'en',
    theme: localStorage.getItem('fic_theme') || 'light',
    role: 'associate',
    entryTab: 'batch',
    expTab: 'exp'
  };

  var batchState = [];
  members.forEach(function() {
    batchState.push({ amt: 0, rcv: null, mth: null, rcvOv: false, mthOv: false, sel: true });
  });

  /* ═══════════════════════════════════════
     HELPERS
  ═══════════════════════════════════════ */
  function t(key) {
    return (TR[appState.lang] && TR[appState.lang][key]) ||
           (TR.en && TR.en[key]) ||
           key;
  }

  function initials(name) {
    if (!name) return '?';
    return name.split(' ').map(w => w[0] || '').slice(0, 2).join('').toUpperCase() || '?';
  }

  function getDefRcv() {
    var btn = document.querySelector('.byBChip.on');
    return btn ? btn.getAttribute('data-v') : t('rcv1');
  }

  function getDefMth() {
    var sel = document.getElementById('bDefMeth');
    return sel ? sel.value : t('methods')[0];
  }

  function getDefAmt() {
    var inp = document.getElementById('bDefAmt');
    return inp ? (parseInt(inp.value) || 300) : 300;
  }

  var toastTimer = null;
  function showToast(msg) {
    var el = document.getElementById('ficToast');
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      el.style.opacity = '0';
    }, 2200);
  }

  /* ═══════════════════════════════════════
     THEME & LANGUAGE
  ═══════════════════════════════════════ */
  function applyTheme(mode) {
    var resolved = mode;
    if (mode === 'system') {
      resolved = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', resolved);
  }

  function setTheme(mode) {
    appState.theme = mode;
    localStorage.setItem('fic_theme', mode);
    applyTheme(mode);
    document.querySelectorAll('.themeBtn').forEach(function(btn) {
      btn.classList.toggle('on', btn.getAttribute('data-th') === mode);
    });
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
      if (appState.theme === 'system') applyTheme('system');
    });
  }

  function applyLang() {
    var lang = appState.lang;
    localStorage.setItem('fic_lang', lang);
    document.documentElement.lang = lang;

    // Update static header
    document.getElementById('appTitle').textContent = t('appTitle');
    document.getElementById('appSub').textContent = t('appSub');

    // Update nav labels
    document.querySelectorAll('#bottomNav .navBtn').forEach(function(btn) {
      var screen = btn.getAttribute('data-screen');
      var span = btn.querySelector('span');
      if (screen === 'home') span.textContent = t('navMembers');
      else if (screen === 'dash') span.textContent = t('navDash');
      else if (screen === 'entry') span.textContent = t('navEntry');
      else if (screen === 'settings') span.textContent = t('navSettings');
    });

    // Re-render current page and re-wire events
    var page = getCurrentPage();
    renderPage(page);
    wirePageEvents(page);
  }

  function getCurrentPage() {
    var path = window.location.pathname;
    if (path.indexOf('members') > -1) return 'home';
    if (path.indexOf('entry') > -1) return 'entry';
    if (path.indexOf('settings') > -1) return 'settings';
    return 'dash';
  }

  /* ═══════════════════════════════════════
     RENDER FUNCTIONS
  ═══════════════════════════════════════ */
  function renderPage(page) {
    if (page === 'home') renderList();
    else if (page === 'dash') renderDash();
    else if (page === 'entry') renderEntry();
    else if (page === 'settings') renderSettings();
  }

  /* ─── Member List ─── */
  function renderList() {
    var q = document.getElementById('srch') ? document.getElementById('srch').value.trim() : '';
    var filter = document.querySelector('.stChip.on') ? document.querySelector('.stChip.on').getAttribute('data-s') : 'all';

    var filtered = members.filter(function(m) {
      var name = appState.lang === 'en' ? m.en : m.n;
      var match = !q || name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                  m.c.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                  m.ph.indexOf(q) > -1 ||
                  m.n.indexOf(q) > -1;
      var paid = m.jun26 > 0;
      var statusOk = filter === 'all' || (filter === 'paid' && paid) || (filter === 'due' && !paid);
      return match && statusOk;
    });

    var rCnt = document.getElementById('rCnt');
    if (rCnt) rCnt.textContent = t('showing') + ' ' + filtered.length + ' ' + t('of') + ' 48';

    var container = document.getElementById('mList');
    if (!container) return;
    container.innerHTML = '';

    filtered.forEach(function(m) {
      var paid = m.jun26 > 0;
      var name = appState.lang === 'en' ? m.en : m.n;
      var role = appState.lang === 'en' ? m.roleEn : m.role;
      var pill = paid ?
        '<span class="pillPaid">৳' + m.jun26 + ' ' + t('paidBadge') + '</span>' :
        '<span class="pillDue">' + t('dueBadge') + '</span>';

      var btn = document.createElement('button');
      btn.className = 'mCard';
      btn.setAttribute('data-c', m.c);
      btn.innerHTML =
        '<div style="display:flex;gap:9px;align-items:flex-start;">' +
          '<div class="avatar bn">' + initials(m.n) + '</div>' +
          '<div style="flex:1;min-width:0;">' +
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;">' +
              '<p class="bn" style="margin:0;font-size:13px;font-weight:600;color:var(--t1);">' +
                m.n + (appState.lang === 'en' && name !== m.n ? ' <span style="color:var(--t3);font-size:11px;">(' + name + ')</span>' : '') +
              '</p>' + pill +
            '</div>' +
            '<p style="margin:1px 0 2px;font-size:10px;color:var(--t4);">' + m.c + ' · ' + m.addr + ' · ' + role + '</p>' +
            '<p style="margin:0;font-size:11px;color:var(--acc);">' + m.ph + '</p>' +
          '</div>' +
        '</div>';
      btn.addEventListener('click', function() { openSheet(m.c); });
      container.appendChild(btn);
    });
  }

  /* ─── Dashboard (share icon updated) ─── */
  function renderDash() {
    var c = document.getElementById('scDash');
    if (!c) return;
    c.innerHTML =
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
        '<div><p style="margin:0;font-size:14px;font-weight:700;color:var(--t1);">' + t('cashSummary') + '</p>' +
        '<p style="margin:0;font-size:10px;color:var(--t4);">' + t('period') + '</p></div>' +
        '<button class="iconBtn" style="flex-direction:row;padding:7px 10px;gap:5px;font-size:11px;">' +
          '<i class="fa-solid fa-share-nodes"></i> ' + t('share') +
        '</button>' +
      '</div>' +
      // ... (rest of dashboard, same as before, but with Font Awesome icons)
      '<div style="background:var(--acc-bg);border:1px solid var(--acc-bdr);border-radius:12px;padding:14px;margin-bottom:10px;">' +
        '<p style="margin:0;font-size:11px;color:var(--acc-txt);font-weight:500;">' + t('totalSavings') + '</p>' +
        '<p style="margin:3px 0 0;font-size:26px;font-weight:800;color:var(--acc-txt);">৳১,৪৭,৮০০</p>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-bottom:10px;">' +
        '<div class="statMini"><p>' + t('collected') + '</p><p>৳২৬,৯০০</p></div>' +
        '<div class="statMini"><p>' + t('expenses') + '</p><p>৳১,৫০০</p></div>' +
        '<div class="statMini" style="background:var(--ok-bg);"><p style="color:var(--ok-txt);">' + t('net') + '</p><p style="color:var(--ok-txt);">+৳২৫,৪০০</p></div>' +
      '</div>' +
      '<div class="card" style="margin-bottom:10px;">' +
        '<p style="margin:0 0 9px;font-size:12px;font-weight:700;color:var(--t1);">' + t('byMethod') + '</p>' +
        mkBar(t('direct'), '৳৫,৮০০', 22) +
        mkBar(t('bkash'), '৳৪০,৪০০', 100) +
        mkBar(t('nagad'), '৳৩৩,৬০০', 83) +
        mkBar(t('rocket'), '৳৬৭,১০০', 100, 'var(--teal)') +
      '</div>' +
      '<div class="card" style="margin-bottom:10px;">' +
        '<p style="margin:0 0 9px;font-size:12px;font-weight:700;color:var(--t1);">' + t('byAccountant') + '</p>' +
        mkBar(t('rcv1'), '৳৭২,৮০০', 97) +
        mkBar(t('rcv2'), '৳৭৫,০০০', 100) +
      '</div>' +
      '<div class="card">' +
        '<p style="margin:0 0 9px;font-size:12px;font-weight:700;color:var(--t1);">' + t('bankInv') + '</p>' +
        '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">' +
          '<div><p style="font-size:10px;color:var(--t3);">' + t('deposit') + '</p><p style="font-size:13px;font-weight:600;color:var(--t1);margin-top:1px;">৳১০,০০০</p></div>' +
          '<div><p style="font-size:10px;color:var(--t3);">' + t('withdrawal') + '</p><p style="font-size:13px;font-weight:600;color:var(--t1);margin-top:1px;">৳০</p></div>' +
          '<div><p style="font-size:10px;color:var(--t3);">' + t('loanDisbursed') + '</p><p style="font-size:13px;font-weight:600;color:var(--t1);margin-top:1px;">৳১,৫০০</p></div>' +
          '<div><p style="font-size:10px;color:var(--ok-txt);">' + t('outstandingLoan') + '</p><p style="font-size:13px;font-weight:600;color:var(--ok-txt);margin-top:1px;">৳১,৫০০</p></div>' +
        '</div>' +
      '</div>';
  }

  function mkBar(label, val, pct, color) {
    return '<div style="margin-bottom:7px;">' +
      '<div style="display:flex;justify-content:space-between;font-size:11px;color:var(--t2);margin-bottom:3px;" class="bn">' +
        '<span>' + label + '</span><span>' + val + '</span>' +
      '</div>' +
      '<div class="progTrack"><div class="progFill" style="width:' + pct + '%;background:' + (color || 'var(--acc)') + '"></div></div>' +
    '</div>';
  }

  /* ─── Entry ─── */
  function renderEntry() {
    var container = document.getElementById('scEntry');
    if (!container) return;
    container.innerHTML =
      '<p style="margin:8px 0 10px;font-size:14px;font-weight:700;color:var(--t1);">' + t('newEntry') + '</p>' +
      '<div style="display:flex;border-bottom:1px solid var(--bdr);margin-bottom:12px;" id="entryTabBar">' +
        '<button class="segBtn' + (appState.entryTab === 'batch' ? ' on' : '') + '" data-etab="batch">' + t('tabBatch') + '</button>' +
        '<button class="segBtn' + (appState.entryTab === 'single' ? ' on' : '') + '" data-etab="single">' + t('tabSingle') + '</button>' +
        '<button class="segBtn' + (appState.entryTab === 'expense' ? ' on' : '') + '" data-etab="expense">' + t('tabExpense') + '</button>' +
      '</div>' +
      '<div id="pBatch" style="' + (appState.entryTab === 'batch' ? '' : 'display:none;') + '">' + buildBatch() + '</div>' +
      '<div id="pSingle" style="' + (appState.entryTab === 'single' ? '' : 'display:none;') + '">' + buildSingle() + '</div>' +
      '<div id="pExpense" style="' + (appState.entryTab === 'expense' ? '' : 'display:none;') + '">' + buildExpense() + '</div>';

    // Attach tab listeners
    container.querySelectorAll('[data-etab]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        appState.entryTab = btn.getAttribute('data-etab');
        container.querySelectorAll('[data-etab]').forEach(function(b) { b.classList.toggle('on', b === btn); });
        container.querySelector('#pBatch').style.display = appState.entryTab === 'batch' ? 'block' : 'none';
        container.querySelector('#pSingle').style.display = appState.entryTab === 'single' ? 'block' : 'none';
        container.querySelector('#pExpense').style.display = appState.entryTab === 'expense' ? 'block' : 'none';
        if (appState.entryTab === 'batch') {
          initBatch();
          renderBatchList();
          wireBatch();
        }
      });
    });

    if (appState.entryTab === 'batch') {
      initBatch();
      renderBatchList();
      wireBatch();
    }
    wireSingle();
    wireExpense();
  }

  function initBatch() {
    var defR = getDefRcv();
    var defM = getDefMth();
    batchState.forEach(function(s) {
      s.rcv = defR;
      s.mth = defM;
    });
  }

  function buildBatch() {
    var methods = t('methods');
    return '<div style="background:var(--acc-bg);border:1px solid var(--acc-bdr);border-radius:10px;padding:9px 12px;margin-bottom:10px;">' +
        '<p style="margin:0 0 2px;font-size:12px;font-weight:600;color:var(--acc-txt);"><i class="fa-solid fa-circle-info"></i> ' + t('batchModeTitle') + '</p>' +
        '<p style="margin:0;font-size:11px;color:var(--acc);">' + t('batchModeHint') + '</p>' +
      '</div>' +
      '<div class="card" style="margin-bottom:6px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
          '<p style="margin:0;font-size:12px;font-weight:600;color:var(--t1);">' + t('defSettings') + '</p>' +
          '<button id="applyAllBtn" style="font-size:10px;padding:3px 9px;border:1px solid var(--acc);border-radius:999px;background:none;color:var(--acc);cursor:pointer;font-family:inherit;white-space:nowrap;">' + t('applyAll') + '</button>' +
        '</div>' +
        '<div style="display:flex;gap:8px;margin-bottom:8px;">' +
          '<div style="flex:1;"><label class="fl">' + t('monthLabel') + '</label>' +
            '<select id="bMonth">' + t('months').map(function(m) { return '<option>' + m + '</option>'; }).join('') + '</select></div>' +
          '<div style="flex:1;"><label class="fl">' + t('defAmt') + '</label>' +
            '<input id="bDefAmt" type="number" value="300" style="text-align:right;"></div>' +
        '</div>' +
        '<div style="display:flex;gap:14px;">' +
          '<div style="flex:1;"><label class="fl">' + t('defReceiver') + '</label>' +
            '<div style="display:flex;gap:6px;">' +
              '<button class="chip on byBChip" data-v="' + t('rcv1') + '" style="font-size:11px;padding:4px 9px;">' + t('rcv1') + '</button>' +
              '<button class="chip byBChip" data-v="' + t('rcv2') + '" style="font-size:11px;padding:4px 9px;">' + t('rcv2') + '</button>' +
            '</div></div>' +
          '<div style="flex:1;"><label class="fl">' + t('defMethod') + '</label>' +
            '<select id="bDefMeth" style="font-size:12px;padding:5px 7px;">' +
              methods.map(function(m) { return '<option value="' + m + '">' + m + '</option>'; }).join('') +
            '</select></div>' +
        '</div>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:10px;padding:4px 2px 6px;font-size:10px;color:var(--t4);">' +
        '<span style="display:flex;align-items:center;gap:3px;"><span style="width:8px;height:8px;background:var(--acc);border-radius:2px;display:inline-block;"></span>' + t('lgDefault') + '</span>' +
        '<span style="display:flex;align-items:center;gap:3px;"><span style="width:8px;height:8px;background:var(--purple);border-radius:2px;display:inline-block;"></span>' + t('lgReceiverOv') + '</span>' +
        '<span style="display:flex;align-items:center;gap:3px;"><span style="width:8px;height:8px;border:1.5px solid var(--amber);border-radius:2px;display:inline-block;"></span>' + t('lgMethodOv') + '</span>' +
      '</div>' +
      '<div class="card" style="overflow:hidden;padding:0;">' +
        '<div style="display:flex;align-items:center;gap:5px;padding:7px 10px;background:var(--bg2);border-bottom:1px solid var(--bdr);">' +
          '<input type="checkbox" id="chkAll" class="rowChk" checked>' +
          '<p style="margin:0;font-size:10px;font-weight:600;color:var(--t3);flex:1;">' + t('colMember') + ' <span id="selCount" style="color:var(--acc);font-weight:700;"></span></p>' +
          '<p style="margin:0;font-size:10px;font-weight:600;color:var(--t3);width:46px;text-align:center;">' + t('colReceiver') + '</p>' +
          '<p style="margin:0;font-size:10px;font-weight:600;color:var(--t3);width:60px;text-align:center;">' + t('colMethod') + '</p>' +
          '<p style="margin:0;font-size:10px;font-weight:600;color:var(--t3);width:58px;text-align:right;">' + t('colAmount') + '</p>' +
        '</div>' +
        '<div id="batchList" style="padding:0 10px;"></div>' +
      '</div>' +
      '<div id="batchFooter" style="position:sticky;bottom:0;background:var(--bg0);padding:10px 0 4px;transition:background .25s;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">' +
          '<div style="font-size:11px;color:var(--t3);"><span id="bEntryCount" style="font-weight:700;color:var(--t1);">0</span> ' + t('entries') + ' &nbsp;·&nbsp; <span id="bRcvSplit" style="font-size:10px;"></span></div>' +
          '<span style="font-size:15px;font-weight:800;color:var(--acc);">৳<span id="bTotal">0</span></span>' +
        '</div>' +
        '<div id="bMethBreak" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;min-height:16px;"></div>' +
        '<button id="bSubmit" style="width:100%;background:var(--acc);color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;">' + t('submitBatch') + '</button>' +
      '</div>';
  }

  function wireBatch() {
    var container = document.getElementById('pBatch');
    if (!container) return;

    // Apply all
    var applyBtn = document.getElementById('applyAllBtn');
    if (applyBtn) {
      applyBtn.addEventListener('click', function() {
        var defR = getDefRcv();
        var defM = getDefMth();
        batchState.forEach(function(s) {
          s.rcv = defR;
          s.mth = defM;
          s.rcvOv = false;
          s.mthOv = false;
        });
        renderBatchList();
        showToast(t('appliedAll'));
      });
    }

    // Default receiver chips
    document.querySelectorAll('.byBChip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        document.querySelectorAll('.byBChip').forEach(function(c) { c.classList.remove('on'); });
        chip.classList.add('on');
        var defR = chip.getAttribute('data-v');
        batchState.forEach(function(s) {
          if (!s.rcvOv) s.rcv = defR;
        });
        document.querySelectorAll('#batchList .bRow').forEach(function(row) {
          var idx = parseInt(row.getAttribute('data-idx'));
          var s = batchState[idx];
          row.querySelectorAll('.rcvBtn').forEach(function(btn) {
            btn.classList.toggle('on', btn.getAttribute('data-v') === s.rcv);
          });
          row.querySelector('.rcvToggle').classList.toggle('ov', s.rcvOv);
        });
        updateBatchFooter();
      });
    });

    // Default method select
    var defMethSel = document.getElementById('bDefMeth');
    if (defMethSel) {
      defMethSel.addEventListener('change', function() {
        var defM = this.value;
        batchState.forEach(function(s) {
          if (!s.mthOv) s.mth = defM;
        });
        document.querySelectorAll('#batchList .mthSel').forEach(function(sel) {
          var idx = parseInt(sel.getAttribute('data-idx'));
          sel.value = batchState[idx].mth;
          sel.classList.toggle('ov', batchState[idx].mthOv);
        });
        updateBatchFooter();
      });
    }

    // Check all
    var chkAll = document.getElementById('chkAll');
    if (chkAll) {
      chkAll.addEventListener('change', function() {
        var checked = this.checked;
        batchState.forEach(function(s) { s.sel = checked; });
        document.querySelectorAll('#batchList .rowChk').forEach(function(c) { c.checked = checked; });
        document.querySelectorAll('#batchList .bRow').forEach(function(row) {
          row.classList.toggle('unchecked', !checked);
        });
        updateBatchFooter();
      });
    }

    // Submit
    var submitBtn = document.getElementById('bSubmit');
    if (submitBtn) {
      submitBtn.addEventListener('click', function() {
        var count = batchState.filter(function(s) { return s.amt > 0 && s.sel; }).length;
        if (count === 0) {
          showToast(t('noAmt'));
          return;
        }
        showToast(count + t('batchSaved'));
      });
    }
  }

  function renderBatchList() {
    var container = document.getElementById('batchList');
    if (!container) return;
    container.innerHTML = '';
    var methods = t('methods');
    var selectedCount = 0;

    members.forEach(function(m, i) {
      var s = batchState[i];
      if (s.sel) selectedCount++;

      var row = document.createElement('div');
      row.className = 'bRow' + (s.amt > 0 && s.sel ? ' has-amt' : '') + (s.sel ? '' : ' unchecked');
      row.setAttribute('data-idx', i);

      row.innerHTML =
        '<input type="checkbox" class="rowChk" data-idx="' + i + '" ' + (s.sel ? 'checked' : '') + ' style="flex-shrink:0;">' +
        '<div style="flex:1;min-width:0;overflow:hidden;">' +
          '<p class="bn" style="margin:0;font-size:11px;font-weight:600;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + m.n + '</p>' +
          '<p style="margin:0;font-size:9px;color:' + (m.jun26 > 0 ? 'var(--ok-txt)' : 'var(--t4)') + ';">' +
            (m.jun26 > 0 ? t('paidShort') : t('dueShort')) +
          '</p>' +
        '</div>' +
        '<div class="rcvToggle' + (s.rcvOv ? ' ov' : '') + '" style="flex-shrink:0;">' +
          '<button class="rcvBtn' + (s.rcv === t('rcv1') ? ' on' : '') + '" data-idx="' + i + '" data-v="' + t('rcv1') + '" title="' + t('rcv1') + '">' + t('rcv1Short') + '</button>' +
          '<button class="rcvBtn' + (s.rcv === t('rcv2') ? ' on' : '') + '" data-idx="' + i + '" data-v="' + t('rcv2') + '" title="' + t('rcv2') + '">' + t('rcv2Short') + '</button>' +
        '</div>' +
        '<select class="mthSel' + (s.mthOv ? ' ov' : '') + '" data-idx="' + i + '" style="width:58px!important;"></select>' +
        '<input class="amtInput" type="number" placeholder="—" data-idx="' + i + '" min="0" step="100" value="' + (s.amt > 0 ? s.amt : '') + '" style="width:58px!important;">';

      var sel = row.querySelector('.mthSel');
      methods.forEach(function(mth) {
        var opt = document.createElement('option');
        opt.value = mth;
        opt.textContent = mth;
        if (mth === s.mth) opt.selected = true;
        sel.appendChild(opt);
      });

      // Row checkbox
      row.querySelector('.rowChk').addEventListener('change', function(e) {
        batchState[i].sel = e.target.checked;
        row.classList.toggle('unchecked', !e.target.checked);
        updateBatchFooter();
        var allChecked = batchState.every(function(x) { return x.sel; });
        var chkAll = document.getElementById('chkAll');
        if (chkAll) chkAll.checked = allChecked;
      });

      // Receiver toggle
      row.querySelectorAll('.rcvBtn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var defR = getDefRcv();
          batchState[i].rcv = btn.getAttribute('data-v');
          batchState[i].rcvOv = (batchState[i].rcv !== defR);
          row.querySelectorAll('.rcvBtn').forEach(function(b) {
            b.classList.toggle('on', b === btn);
          });
          row.querySelector('.rcvToggle').classList.toggle('ov', batchState[i].rcvOv);
          updateBatchFooter();
        });
      });

      // Method select
      sel.addEventListener('change', function() {
        batchState[i].mth = sel.value;
        batchState[i].mthOv = (sel.value !== getDefMth());
        sel.classList.toggle('ov', batchState[i].mthOv);
        updateBatchFooter();
      });

      // Amount input
      var amtInput = row.querySelector('.amtInput');
      amtInput.addEventListener('input', function() {
        batchState[i].amt = parseInt(amtInput.value) || 0;
        row.classList.toggle('has-amt', batchState[i].amt > 0 && batchState[i].sel);
        updateBatchFooter();
      });

      container.appendChild(row);
    });

    var selCount = document.getElementById('selCount');
    if (selCount) selCount.textContent = '(' + selectedCount + ')';
    updateBatchFooter();
  }

  function updateBatchFooter() {
    var total = 0, count = 0, rcv1Total = 0, rcv2Total = 0;
    var methMap = {};
    batchState.forEach(function(s) {
      if (s.amt > 0 && s.sel) {
        total += s.amt;
        count++;
        if (s.rcv === t('rcv1')) rcv1Total += s.amt;
        else rcv2Total += s.amt;
        methMap[s.mth] = (methMap[s.mth] || 0) + s.amt;
      }
    });

    var totalEl = document.getElementById('bTotal');
    if (totalEl) totalEl.textContent = total.toLocaleString('en-IN');

    var countEl = document.getElementById('bEntryCount');
    if (countEl) countEl.textContent = count;

    var splitEl = document.getElementById('bRcvSplit');
    if (splitEl) {
      splitEl.textContent = count > 0 ?
        t('rcv1') + ' ৳' + rcv1Total.toLocaleString('en-IN') + ' · ' + t('rcv2') + ' ৳' + rcv2Total.toLocaleString('en-IN') :
        '';
    }

    var breakEl = document.getElementById('bMethBreak');
    if (breakEl) {
      breakEl.innerHTML = '';
      Object.keys(methMap).forEach(function(k) {
        var span = document.createElement('span');
        span.style.cssText = 'font-size:10px;background:var(--acc-bg);color:var(--acc-txt);padding:2px 7px;border-radius:999px;white-space:nowrap;';
        span.textContent = k + ' ৳' + methMap[k].toLocaleString('en-IN');
        breakEl.appendChild(span);
      });
    }
  }

  /* ── Single Entry ── */
  function buildSingle() {
    var methods = t('methods');
    var options = members.map(function(m) {
      return '<option value="' + m.c + '">' + m.n + ' — ' + m.c + '</option>';
    }).join('');
    return '<div style="margin-bottom:8px;"><label class="fl">' + t('colMember') + '</label><select id="sMember"><option value="">' + t('selectMember') + '</option>' + options + '</select></div>' +
      '<div style="margin-bottom:8px;"><label class="fl">' + t('monthLabel') + '</label><select id="sMonth">' + t('months').map(function(m) { return '<option>' + m + '</option>'; }).join('') + '</select></div>' +
      '<div style="margin-bottom:8px;"><label class="fl">' + t('amtLabel') + '</label><input id="sAmt" type="number" placeholder="300" style="text-align:right;"></div>' +
      '<div style="margin-bottom:8px;"><label class="fl">' + t('receiverLabel') + '</label><div style="display:flex;gap:6px;">' +
        '<button class="chip on bySChip" style="font-size:11px;">' + t('rcv1') + '</button>' +
        '<button class="chip bySChip" style="font-size:11px;">' + t('rcv2') + '</button>' +
      '</div></div>' +
      '<div style="margin-bottom:12px;"><label class="fl">' + t('methodLabel') + '</label><div style="display:flex;gap:5px;flex-wrap:wrap;">' +
        methods.map(function(m, i) {
          return '<button class="chip' + (i === 0 ? ' on' : '') + ' mSChip" style="font-size:11px;">' + m + '</button>';
        }).join('') +
      '</div></div>' +
      '<div style="margin-bottom:12px;"><label class="fl">' + t('noteLabel') + '</label><input id="sNote" type="text" placeholder="' + t('notePlaceholder') + '"></div>' +
      '<button id="sSave" style="width:100%;background:var(--acc);color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;">' + t('saveBtn') + '</button>';
  }

  function wireSingle() {
    function toggleGroup(cls) {
      document.querySelectorAll('.' + cls).forEach(function(btn) {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.' + cls).forEach(function(b) { b.classList.remove('on'); });
          btn.classList.add('on');
        });
      });
    }
    toggleGroup('bySChip');
    toggleGroup('mSChip');

    var saveBtn = document.getElementById('sSave');
    if (saveBtn) saveBtn.addEventListener('click', function() { showToast(t('saved')); });
  }

  /* ── Expense ── */
  function buildExpense() {
    return '<div style="display:flex;border-bottom:1px solid var(--bdr);margin-bottom:10px;">' +
        '<button class="segBtn' + (appState.expTab === 'exp' ? ' on' : '') + '" data-exptab="exp" style="font-size:11px;">' + t('expTab') + '</button>' +
        '<button class="segBtn' + (appState.expTab === 'bank' ? ' on' : '') + '" data-exptab="bank" style="font-size:11px;">' + t('bankTab') + '</button>' +
        '<button class="segBtn' + (appState.expTab === 'loan' ? ' on' : '') + '" data-exptab="loan" style="font-size:11px;">' + t('loanTab') + '</button>' +
      '</div>' +
      '<div id="pExp" style="' + (appState.expTab === 'exp' ? '' : 'display:none;') + '">' +
        '<div style="margin-bottom:8px;"><label class="fl">' + t('subjectLabel') + '</label><select>' + t('expCats').map(function(c) { return '<option>' + c + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:8px;"><label class="fl">' + t('amtLabel') + '</label><input type="number" placeholder="200" style="text-align:right;"></div>' +
        '<div style="margin-bottom:12px;"><label class="fl">' + t('descLabel') + '</label><input type="text" placeholder="' + t('descPh') + '"></div>' +
        '<button id="expSave" style="width:100%;background:var(--acc);color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;">' + t('saveBtn') + '</button>' +
      '</div>' +
      '<div id="pBank" style="' + (appState.expTab === 'bank' ? '' : 'display:none;') + '">' +
        '<div style="margin-bottom:8px;"><label class="fl">' + t('typeLabel') + '</label><select>' + t('bankTypes').map(function(b) { return '<option>' + b + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:8px;"><label class="fl">' + t('amtLabel') + '</label><input type="number" placeholder="10000" style="text-align:right;"></div>' +
        '<div style="margin-bottom:12px;"><label class="fl">' + t('descLabel') + '</label><input type="text" placeholder="' + t('descPh') + '"></div>' +
        '<button id="bankSave" style="width:100%;background:var(--acc);color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;">' + t('saveBtn') + '</button>' +
      '</div>' +
      '<div id="pLoan" style="' + (appState.expTab === 'loan' ? '' : 'display:none;') + '">' +
        '<div style="margin-bottom:8px;"><label class="fl">' + t('colMember') + '</label><select><option value="">' + t('selectMember') + '</option>' + members.map(function(m) { return '<option>' + m.n + ' — ' + m.c + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:8px;"><label class="fl">' + t('typeLabel') + '</label><select>' + t('loanTypes').map(function(l) { return '<option>' + l + '</option>'; }).join('') + '</select></div>' +
        '<div style="margin-bottom:8px;"><label class="fl">' + t('amtLabel') + '</label><input type="number" placeholder="1500" style="text-align:right;"></div>' +
        '<div style="margin-bottom:12px;"><label class="fl">' + t('descLabel') + '</label><input type="text" placeholder="' + t('commentPh') + '"></div>' +
        '<button id="loanSave" style="width:100%;background:var(--acc);color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;">' + t('saveBtn') + '</button>' +
      '</div>';
  }

  function wireExpense() {
    var wrapper = document.getElementById('pExpense');
    if (!wrapper) return;

    wrapper.querySelectorAll('[data-exptab]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        appState.expTab = btn.getAttribute('data-exptab');
        wrapper.querySelectorAll('[data-exptab]').forEach(function(b) { b.classList.toggle('on', b === btn); });
        wrapper.querySelector('#pExp').style.display = appState.expTab === 'exp' ? 'block' : 'none';
        wrapper.querySelector('#pBank').style.display = appState.expTab === 'bank' ? 'block' : 'none';
        wrapper.querySelector('#pLoan').style.display = appState.expTab === 'loan' ? 'block' : 'none';
      });
    });

    ['expSave', 'bankSave', 'loanSave'].forEach(function(id) {
      var btn = document.getElementById(id);
      if (btn) btn.addEventListener('click', function() { showToast(t('saved')); });
    });
  }

  /* ─── Settings ─── */
  function renderSettings() {
    var container = document.getElementById('scSettings');
    if (!container) return;
    container.innerHTML =
      '<div class="aboutCard">' +
        '<div class="aboutLogo">F</div>' +
        '<div>' +
          '<p style="font-size:15px;font-weight:700;margin:0;">FIC Staff Portal</p>' +
          '<p style="font-size:11px;opacity:.75;margin:2px 0 0;">v2.0 · Combined Edition</p>' +
        '</div>' +
      '</div>' +
      '<div class="settingSection">' +
        '<p class="sectionHead">' + t('displaySection') + '</p>' +
        '<div class="settingRow" style="border-top:none;flex-direction:column;align-items:flex-start;padding-bottom:0;">' +
          '<p class="sLabel">' + t('languageLabel') + '</p>' +
        '</div>' +
        '<div class="langGroup">' +
          '<button class="langBtn' + (appState.lang === 'bn' ? ' on' : '') + '" data-lang="bn">' +
            '<span style="font-size:16px;">🇧🇩</span>' +
            '<span class="bn" style="font-size:12px;">বাংলা</span>' +
          '</button>' +
          '<button class="langBtn' + (appState.lang === 'en' ? ' on' : '') + '" data-lang="en">' +
            '<span style="font-size:16px;">🇬🇧</span>' +
            '<span style="font-size:12px;">English</span>' +
          '</button>' +
        '</div>' +
        '<div class="settingRow" style="flex-direction:column;align-items:flex-start;padding-bottom:0;">' +
          '<p class="sLabel">' + t('themeLabel') + '</p>' +
        '</div>' +
        '<div class="themeGroup">' +
          '<button class="themeBtn' + (appState.theme === 'dark' ? ' on' : '') + '" data-th="dark">' +
            '<span style="font-size:18px;">🌙</span>' +
            '<span>' + t('themeDark') + '</span>' +
          '</button>' +
          '<button class="themeBtn' + (appState.theme === 'light' ? ' on' : '') + '" data-th="light">' +
            '<span style="font-size:18px;">☀️</span>' +
            '<span>' + t('themeLight') + '</span>' +
          '</button>' +
          '<button class="themeBtn' + (appState.theme === 'system' ? ' on' : '') + '" data-th="system">' +
            '<span style="font-size:18px;">⚙️</span>' +
            '<span>' + t('themeSystem') + '</span>' +
          '</button>' +
        '</div>' +
      '</div>' +
      '<div class="settingSection">' +
        '<p class="sectionHead">' + t('aboutSection') + '</p>' +
        '<div class="settingRow" style="border-top:none;">' +
          '<p class="sLabel">' + t('versionLabel') + '</p>' +
          '<p class="sSub">2.0.0</p>' +
        '</div>' +
        '<div class="settingRow">' +
          '<p class="sLabel">' + t('membersLabel') + '</p>' +
          '<p class="sSub" style="font-weight:600;color:var(--acc);">48</p>' +
        '</div>' +
        '<div class="settingRow">' +
          '<p class="sLabel">' + t('periodLabel') + '</p>' +
          '<p class="sSub bn">' + t('juneLabel') + '</p>' +
        '</div>' +
      '</div>';

    // Language buttons
    container.querySelectorAll('[data-lang]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        appState.lang = btn.getAttribute('data-lang');
        container.querySelectorAll('[data-lang]').forEach(function(b) { b.classList.toggle('on', b === btn); });
        applyLang();
      });
    });

    // Theme buttons
    container.querySelectorAll('[data-th]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        setTheme(btn.getAttribute('data-th'));
        container.querySelectorAll('[data-th]').forEach(function(b) {
          b.classList.toggle('on', b.getAttribute('data-th') === appState.theme);
        });
      });
    });
  }

  /* ─── Member Sheet ─── */
  function openSheet(code) {
    var m = members.filter(function(x) { return x.c === code; })[0];
    if (!m) return;

    var paid = m.jun26 > 0;
    var dueWarning = paid ? '' : '<div style="background:var(--warn-bg);color:var(--warn-txt);font-size:11px;padding:8px 10px;border-radius:9px;margin:8px 0;text-align:center;font-weight:600;">' + t('paymentDue') + '</div>';
    var loanBadge = m.loan > 0 ? '<span style="font-size:11px;padding:3px 8px;border-radius:999px;background:var(--warn-bg);color:var(--warn-txt);font-weight:600;">' + t('loanBadge') + ': ৳' + m.loan + '</span>' : '';

    var phoneClean = m.ph.replace(/[^0-9]/g, '').replace(/^0/, '');
    var waHref = 'https://wa.me/880' + phoneClean;

    document.getElementById('shBody').innerHTML =
      '<div style="display:flex;justify-content:flex-end;"><button id="cBtn" style="background:var(--bg2);border:none;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:var(--t2);cursor:pointer;font-size:16px;">✕</button></div>' +
      '<div style="text-align:center;margin-bottom:10px;">' +
        '<div class="avatar bn" style="width:54px;height:54px;font-size:17px;font-weight:800;margin:0 auto 8px;">' + initials(m.n) + '</div>' +
        '<p class="bn" style="margin:0;font-size:16px;font-weight:700;color:var(--t1);">' + m.n + '</p>' +
        '<p style="margin:1px 0 0;font-size:11px;color:var(--t4);">' + m.c + ' · ' + m.j + '</p>' +
        '<div style="display:flex;gap:6px;justify-content:center;margin-top:6px;">' +
          '<span style="font-size:11px;padding:3px 8px;border-radius:999px;background:var(--acc-bg);color:var(--acc-txt);font-weight:500;" class="bn">' + m.role + '</span>' +
          loanBadge +
        '</div>' +
      '</div>' +
      dueWarning +
      '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0;">' +
        '<a class="iconBtn" href="tel:' + m.ph + '"><i class="fa-solid fa-phone"></i> ' + t('call') + '</a>' +
        '<a class="iconBtn" href="' + waHref + '"><i class="fa-brands fa-whatsapp"></i> ' + t('whatsapp') + '</a>' +
        '<button class="iconBtn"><i class="fa-solid fa-envelope"></i> ' + t('email') + '</button>' +
        '<button class="iconBtn"><i class="fa-solid fa-location-dot"></i> ' + t('maps') + '</button>' +
      '</div>' +
      '<div class="card" style="margin-bottom:10px;">' +
        mkDetailRow(t('addrLabel'), m.addr, true) +
        mkDetailRow(t('mobileLabel'), '<span style="color:var(--acc);">' + m.ph + '</span>', false) +
        mkDetailRow(t('joinedLabel'), m.j, true) +
      '</div>' +
      '<div class="card">' +
        '<p style="margin:0;font-size:11px;color:var(--t3);">' + t('totalSavingsLabel') + '</p>' +
        '<p style="margin:2px 0 8px;font-size:23px;font-weight:800;color:var(--t1);">৳' + m.total.toLocaleString('en-IN') + '</p>' +
        '<div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0 0;border-top:1px solid var(--bg2);">' +
          '<span style="color:var(--t3);">' + t('juneLabel') + '</span>' +
          '<span style="font-weight:700;color:' + (paid ? 'var(--ok-txt)' : 'var(--warn-txt)') + ';">' + (paid ? '৳' + m.jun26 : '—') + '</span>' +
        '</div>' +
      '</div>' +
      '<button id="histBtn" style="width:100%;margin-top:10px;background:none;border:1px solid var(--bdr);border-radius:9px;padding:10px;font-size:12px;color:var(--acc);font-weight:500;font-family:inherit;cursor:pointer;">' + t('fullHistory') + '</button>';

    document.getElementById('shOv').style.opacity = '1';
    document.getElementById('shOv').style.pointerEvents = 'auto';
    document.getElementById('shDrw').style.transform = 'translateY(0)';
    document.getElementById('cBtn').onclick = closeSheet;
  }

  function mkDetailRow(label, val, isLast) {
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;' + (isLast ? '' : 'border-bottom:1px solid var(--bg2);') + 'font-size:12px;">' +
      '<span style="color:var(--t3);">' + label + '</span>' +
      '<span class="bn" style="color:var(--t1);">' + val + '</span>' +
    '</div>';
  }

  function closeSheet() {
    document.getElementById('shOv').style.opacity = '0';
    document.getElementById('shOv').style.pointerEvents = 'none';
    document.getElementById('shDrw').style.transform = 'translateY(100%)';
  }

  /* ═══════════════════════════════════════
     PAGE EVENT WIRING
  ═══════════════════════════════════════ */
  function wirePageEvents(page) {
    if (page === 'home') {
      // Filter chips
      document.querySelectorAll('.stChip').forEach(function(chip) {
        chip.addEventListener('click', function() {
          document.querySelectorAll('.stChip').forEach(function(c) { c.classList.toggle('on', c === chip); });
          renderList();
        });
      });
      // Search
      var searchInput = document.getElementById('srch');
      if (searchInput) {
        // Remove old listener to avoid duplicates
        searchInput.removeEventListener('input', renderList);
        searchInput.addEventListener('input', renderList);
      }
    }
    // Entry page events are wired inside renderEntry()
  }

  /* ═══════════════════════════════════════
     GLOBAL INIT
  ═══════════════════════════════════════ */
  function initPage(page) {
    // Apply theme and language
    applyTheme(appState.theme);
    applyLang();

    // Highlight current nav
    document.querySelectorAll('#bottomNav .navBtn').forEach(function(btn) {
      btn.classList.toggle('on', btn.getAttribute('data-screen') === page);
    });

    // Role switcher
    document.querySelectorAll('.roleBtn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.roleBtn').forEach(function(b) { b.classList.toggle('on', b === btn); });
        appState.role = btn.getAttribute('data-role');
        var entryNav = document.getElementById('navEntry');
        if (entryNav) entryNav.style.display = appState.role === 'accountant' ? 'flex' : 'none';
      });
    });

    // Initial entry nav visibility
    var entryNav = document.getElementById('navEntry');
    if (entryNav) entryNav.style.display = appState.role === 'accountant' ? 'flex' : 'none';

    // Drawer overlay close
    document.getElementById('shOv').addEventListener('click', closeSheet);

    // Render page content and wire events
    renderPage(page);
    wirePageEvents(page);
  }

  // Expose globally
  window.initPage = initPage;
  window.openSheet = openSheet;
  window.closeSheet = closeSheet;

})();
