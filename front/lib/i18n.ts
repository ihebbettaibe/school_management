export type Language = "en" | "ar" | "fr"

export interface Translations {
  // Common
  common: {
    signIn: string
    signUp: string
    getStarted: string
    language: string
    loading: string
    save: string
    cancel: string
    edit: string
    delete: string
    approve: string
    reject: string
    submit: string
    close: string
  }

  // Homepage
  homepage: {
    title: string
    tagline: string
    description: string
    featuresTitle: string
    assignments: {
      title: string
      description: string
    }
    attendance: {
      title: string
      description: string
    }
    notifications: {
      title: string
      description: string
    }
    analytics: {
      title: string
      description: string
    }
    footer: string
  }

  // Navigation
  navigation: {
    dashboard: string
    schedule: string
    assignments: string
    attendance: string
    schoolFeed: string
    notifications: string
    analytics: string
    suggestions: string
    profile: string
    settings: string
  }

  // Profile
  profile: {
    parentInfo: string
    teacherInfo: string
    schoolInfo: string
    children: string
    meetings: string
    classes: string
    fullName: string
    email: string
    phone: string
    password: string
    newPassword: string
    changePhoto: string
    saveChanges: string
    addChild: string
    addTeacher: string
  }

  // Authentication
  auth: {
    welcomeBack: string
    createAccount: string
    selectRole: string
    parent: string
    teacher: string
    admin: string
    emailAddress: string
    password: string
    confirmPassword: string
    fullName: string
    phoneNumber: string
    schoolCode: string
    signInButton: string
    signUpButton: string
    alreadyHaveAccount: string
    dontHaveAccount: string
    forgotPassword: string
    invalidCredentials: string
    passwordsDoNotMatch: string
    accountCreated: string
    loginSuccessful: string
  }

  // Child Profile
  children: {
    childName: string
    age: string
    gender: string
    male: string
    female: string
    year: string
    class: string
    addNewChild: string
    editChild: string
    deleteChild: string
    confirmDelete: string
    childAdded: string
    childUpdated: string
    childDeleted: string
  }

  // Schedule (NEW)
  schedule: {
    addGrade: string
    addGradePlaceholder: string
    addClass: string
    addClassPlaceholder: string
    publish: string
    addTimeSlot: string
    addTimeSlotHint: string
    noScheduleForDay: string
    selectTime: string
    selectSubject: string
    time: string
    subject: string
    teacher: string
    teacherNamePlaceholder: string
    selectGradeClassTitle: string
    selectGradeClassHint: string
    days: { [key: string]: string }
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    schedule: {
      addGrade: "Add Grade",
      addGradePlaceholder: "Add new grade (e.g., Grade 3)",
      addClass: "Add Class",
      addClassPlaceholder: "Add new class (e.g., Class D)",
      publish: "Publish Schedule",
      addTimeSlot: "Add Time Slot",
      addTimeSlotHint: "Click 'Add Time Slot' to get started",
      noScheduleForDay: "No schedule set for {day}",
      selectTime: "Select time",
      selectSubject: "Select subject",
      time: "Time",
      subject: "Subject",
      teacher: "Teacher",
      teacherNamePlaceholder: "Teacher name",
      selectGradeClassTitle: "Select a Grade and Class",
      selectGradeClassHint: "Choose a grade and class from the left to manage its schedule",
      days: {
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday",
        Sunday: "Sunday"
      }
    },
    common: {
      signIn: "Sign In",
      signUp: "Sign Up",
      getStarted: "Get Started",
      language: "Language",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      approve: "Approve",
      reject: "Reject",
      submit: "Submit",
      close: "Close",
    },
    homepage: {
      title: "DiLo Connect",
      tagline: "Stay connected with your school",
      description:
        "A comprehensive platform bringing together parents, teachers, and school administrators for seamless communication and collaboration.",
      featuresTitle: "Everything you need in one place",
      assignments: {
        title: "Assignments",
        description: "Track homework, projects, and deadlines with ease",
      },
      attendance: {
        title: "Attendance",
        description: "Monitor student attendance and receive instant alerts",
      },
      notifications: {
        title: "Notifications",
        description: "Stay informed with real-time updates and alerts",
      },
      analytics: {
        title: "Analytics",
        description: "Insights and reports to track academic progress",
      },
      footer: "© 2024 DiLo Connect. Connecting schools, parents, and teachers.",
    },
    navigation: {
      dashboard: "Dashboard",
      schedule: "Schedule",
      assignments: "Assignments",
      attendance: "Attendance",
      schoolFeed: "School Feed",
      notifications: "Notifications",
      analytics: "Analytics",
      suggestions: "Suggestions",
      profile: "Profile",
      settings: "Settings",
    },
    profile: {
      parentInfo: "Parent Information",
      teacherInfo: "Teacher Information",
      schoolInfo: "School Information",
      children: "Children",
      meetings: "Meetings",
      classes: "Classes",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone Number",
      password: "Password",
      newPassword: "New Password",
      changePhoto: "Change Photo",
      saveChanges: "Save Changes",
      addChild: "Add Child",
      addTeacher: "Add Teacher",
    },
    auth: {
      welcomeBack: "Welcome back",
      createAccount: "Create your account",
      selectRole: "Select your role",
      parent: "Parent",
      teacher: "Teacher",
      admin: "School Admin",
      emailAddress: "Email Address",
      password: "Password",
      confirmPassword: "Confirm Password",
      fullName: "Full Name",
      phoneNumber: "Phone Number",
      schoolCode: "School Code",
      signInButton: "Sign In",
      signUpButton: "Create Account",
      alreadyHaveAccount: "Already have an account?",
      dontHaveAccount: "Don't have an account?",
      forgotPassword: "Forgot password?",
      invalidCredentials: "Invalid email or password",
      passwordsDoNotMatch: "Passwords do not match",
      accountCreated: "Account created successfully!",
      loginSuccessful: "Login successful!",
    },
    children: {
      childName: "Child Name",
      age: "Age",
      gender: "Gender",
      male: "Male",
      female: "Female",
      year: "Year",
      class: "Class",
      addNewChild: "Add New Child",
      editChild: "Edit Child",
      deleteChild: "Delete Child",
      confirmDelete: "Are you sure you want to delete this child profile?",
      childAdded: "Child profile added successfully!",
      childUpdated: "Child profile updated successfully!",
      childDeleted: "Child profile deleted successfully!",
    },
  },
  ar: {
    schedule: {
      addGrade: "إضافة صف",
      addGradePlaceholder: "أضف صف جديد (مثال: الصف الثالث)",
      addClass: "إضافة فصل",
      addClassPlaceholder: "أضف فصل جديد (مثال: فصل د)",
      publish: "نشر الجدول",
      addTimeSlot: "إضافة فترة زمنية",
      addTimeSlotHint: "انقر على 'إضافة فترة زمنية' للبدء",
      noScheduleForDay: "لا يوجد جدول ليوم {day}",
      selectTime: "اختر الوقت",
      selectSubject: "اختر المادة",
      time: "الوقت",
      subject: "المادة",
      teacher: "المعلم",
      teacherNamePlaceholder: "اسم المعلم",
      selectGradeClassTitle: "اختر صفاً وفصلاً",
      selectGradeClassHint: "اختر صفاً وفصلاً من القائمة لإدارة الجدول",
      days: {
        Monday: "الاثنين",
        Tuesday: "الثلاثاء",
        Wednesday: "الأربعاء",
        Thursday: "الخميس",
        Friday: "الجمعة",
        Saturday: "السبت",
        Sunday: "الأحد"
      }
    },
    common: {
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      getStarted: "ابدأ الآن",
      language: "اللغة",
      loading: "جاري التحميل...",
      save: "حفظ",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      approve: "موافقة",
      reject: "رفض",
      submit: "إرسال",
      close: "إغلاق",
    },
    homepage: {
      title: "ديلو كونكت",
      tagline: "ابق على تواصل مع مدرستك",
      description: "منصة شاملة تجمع بين أولياء الأمور والمعلمين وإدارة المدرسة للتواصل والتعاون السلس.",
      featuresTitle: "كل ما تحتاجه في مكان واحد",
      assignments: {
        title: "الواجبات",
        description: "تتبع الواجبات المنزلية والمشاريع والمواعيد النهائية بسهولة",
      },
      attendance: {
        title: "الحضور",
        description: "راقب حضور الطلاب واحصل على تنبيهات فورية",
      },
      notifications: {
        title: "الإشعارات",
        description: "ابق على اطلاع بالتحديثات والتنبيهات في الوقت الفعلي",
      },
      analytics: {
        title: "التحليلات",
        description: "رؤى وتقارير لتتبع التقدم الأكاديمي",
      },
      footer: "© 2024 ديلو كونكت. ربط المدارس وأولياء الأمور والمعلمين.",
    },
    navigation: {
      dashboard: "لوحة التحكم",
      schedule: "الجدول",
      assignments: "الواجبات",
      attendance: "الحضور",
      schoolFeed: "أخبار المدرسة",
      notifications: "الإشعارات",
      analytics: "التحليلات",
      suggestions: "الاقتراحات",
      profile: "الملف الشخصي",
      settings: "الإعدادات",
    },
    profile: {
      parentInfo: "معلومات ولي الأمر",
      teacherInfo: "معلومات المعلم",
      schoolInfo: "معلومات المدرسة",
      children: "الأطفال",
      meetings: "الاجتماعات",
      classes: "الفصول",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      password: "كلمة المرور",
      newPassword: "كلمة المرور الجديدة",
      changePhoto: "تغيير الصورة",
      saveChanges: "حفظ التغييرات",
      addChild: "إضافة طفل",
      addTeacher: "إضافة معلم",
    },
    auth: {
      welcomeBack: "مرحباً بعودتك",
      createAccount: "إنشاء حسابك",
      selectRole: "اختر دورك",
      parent: "ولي أمر",
      teacher: "معلم",
      admin: "مدير مدرسة",
      emailAddress: "عنوان البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      fullName: "الاسم الكامل",
      phoneNumber: "رقم الهاتف",
      schoolCode: "رمز المدرسة",
      signInButton: "تسجيل الدخول",
      signUpButton: "إنشاء حساب",
      alreadyHaveAccount: "لديك حساب بالفعل؟",
      dontHaveAccount: "ليس لديك حساب؟",
      forgotPassword: "نسيت كلمة المرور؟",
      invalidCredentials: "بريد إلكتروني أو كلمة مرور غير صحيحة",
      passwordsDoNotMatch: "كلمات المرور غير متطابقة",
      accountCreated: "تم إنشاء الحساب بنجاح!",
      loginSuccessful: "تم تسجيل الدخول بنجاح!",
    },
    children: {
      childName: "اسم الطفل",
      age: "العمر",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
      year: "السنة",
      class: "الفصل",
      addNewChild: "إضافة طفل جديد",
      editChild: "تعديل الطفل",
      deleteChild: "حذف الطفل",
      confirmDelete: "هل أنت متأكد من حذف ملف الطفل هذا؟",
      childAdded: "تم إضافة ملف الطفل بنجاح!",
      childUpdated: "تم تحديث ملف الطفل بنجاح!",
      childDeleted: "تم حذف ملف الطفل بنجاح!",
    },
  },
  fr: {
    schedule: {
      addGrade: "Ajouter un niveau",
      addGradePlaceholder: "Ajouter un nouveau niveau (ex: 3ème)",
      addClass: "Ajouter une classe",
      addClassPlaceholder: "Ajouter une nouvelle classe (ex: Classe D)",
      publish: "Publier l'emploi du temps",
      addTimeSlot: "Ajouter un créneau",
      addTimeSlotHint: "Cliquez sur 'Ajouter un créneau' pour commencer",
      noScheduleForDay: "Aucun emploi du temps pour {day}",
      selectTime: "Sélectionner l'heure",
      selectSubject: "Sélectionner la matière",
      time: "Heure",
      subject: "Matière",
      teacher: "Enseignant",
      teacherNamePlaceholder: "Nom de l'enseignant",
      selectGradeClassTitle: "Sélectionnez un niveau et une classe",
      selectGradeClassHint: "Choisissez un niveau et une classe à gauche pour gérer l'emploi du temps",
      days: {
        Monday: "Lundi",
        Tuesday: "Mardi",
        Wednesday: "Mercredi",
        Thursday: "Jeudi",
        Friday: "Vendredi",
        Saturday: "Samedi",
        Sunday: "Dimanche"
      }
    },
    common: {
      signIn: "Se connecter",
      signUp: "S'inscrire",
      getStarted: "Commencer",
      language: "Langue",
      loading: "Chargement...",
      save: "Enregistrer",
      cancel: "Annuler",
      edit: "Modifier",
      delete: "Supprimer",
      approve: "Approuver",
      reject: "Rejeter",
      submit: "Soumettre",
      close: "Fermer",
    },
    homepage: {
      title: "DiLo Connect",
      tagline: "Restez connecté avec votre école",
      description:
        "Une plateforme complète qui rassemble parents, enseignants et administrateurs scolaires pour une communication et collaboration fluides.",
      featuresTitle: "Tout ce dont vous avez besoin en un seul endroit",
      assignments: {
        title: "Devoirs",
        description: "Suivez les devoirs, projets et échéances facilement",
      },
      attendance: {
        title: "Présence",
        description: "Surveillez la présence des élèves et recevez des alertes instantanées",
      },
      notifications: {
        title: "Notifications",
        description: "Restez informé avec des mises à jour et alertes en temps réel",
      },
      analytics: {
        title: "Analyses",
        description: "Aperçus et rapports pour suivre les progrès académiques",
      },
      footer: "© 2024 DiLo Connect. Connecter écoles, parents et enseignants.",
    },
    navigation: {
      dashboard: "Tableau de bord",
      schedule: "Emploi du temps",
      assignments: "Devoirs",
      attendance: "Présence",
      schoolFeed: "Actualités école",
      notifications: "Notifications",
      analytics: "Analyses",
      suggestions: "Suggestions",
      profile: "Profil",
      settings: "Paramètres",
    },
    profile: {
      parentInfo: "Informations parent",
      teacherInfo: "Informations enseignant",
      schoolInfo: "Informations école",
      children: "Enfants",
      meetings: "Réunions",
      classes: "Classes",
      fullName: "Nom complet",
      email: "Email",
      phone: "Numéro de téléphone",
      password: "Mot de passe",
      newPassword: "Nouveau mot de passe",
      changePhoto: "Changer la photo",
      saveChanges: "Enregistrer les modifications",
      addChild: "Ajouter un enfant",
      addTeacher: "Ajouter un enseignant",
    },
    auth: {
      welcomeBack: "Bon retour",
      createAccount: "Créer votre compte",
      selectRole: "Sélectionnez votre rôle",
      parent: "Parent",
      teacher: "Enseignant",
      admin: "Administrateur scolaire",
      emailAddress: "Adresse e-mail",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      fullName: "Nom complet",
      phoneNumber: "Numéro de téléphone",
      schoolCode: "Code de l'école",
      signInButton: "Se connecter",
      signUpButton: "Créer un compte",
      alreadyHaveAccount: "Vous avez déjà un compte ?",
      dontHaveAccount: "Vous n'avez pas de compte ?",
      forgotPassword: "Mot de passe oublié ?",
      invalidCredentials: "E-mail ou mot de passe invalide",
      passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
      accountCreated: "Compte créé avec succès !",
      loginSuccessful: "Connexion réussie !",
    },
    children: {
      childName: "Nom de l'enfant",
      age: "Âge",
      gender: "Genre",
      male: "Masculin",
      female: "Féminin",
      year: "Année",
      class: "Classe",
      addNewChild: "Ajouter un nouvel enfant",
      editChild: "Modifier l'enfant",
      deleteChild: "Supprimer l'enfant",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer ce profil d'enfant ?",
      childAdded: "Profil d'enfant ajouté avec succès !",
      childUpdated: "Profil d'enfant mis à jour avec succès !",
      childDeleted: "Profil d'enfant supprimé avec succès !",
    },
  },
}

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.en
}
