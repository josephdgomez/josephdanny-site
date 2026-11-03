/* ------------------------------------------------------------------
   CONTENT. To add a piece, add one line: [type, driveFileId, "Title"].
   Types: "v" video, "p" PDF, "i" image.
   Each section's `folder` powers a "Browse folder" link that always
   shows whatever is in that Drive folder, including new uploads.
   Set contact details below; leave blank to hide the contact section.
------------------------------------------------------------------- */

const WORK = [
  {
    slug: "elevate-health",
    name: "Elevate Health",
    role: "Communications Manager, 2025 to present",
    intro: "An Accountable Community of Health in Pierce County, Washington. Paid campaigns, a video explainer series, and translated print materials.",
    groups: [
      { title: "Paid ad campaigns", sections: [
        { title: "Apple Health campaign", folder: "1TIfWuOAAUhPgvKo53wg8HdyC2Kp_VHoH", items: [
          ["v", "1XNNYuRPQtPNnfL_FjGF_AnTzq4iEhuuw", "Big Changes Are Coming"],
          ["v", "1KoTOxcifN4v54dwmPdTEBbWtin2Nc3gd", "If You Use Apple Health"],
          ["i", "1_p-CuczC01LbfUe9EwzPMeHGfwynbcPs", "Graphic ad 1"],
          ["i", "10aQPzK9rTBUhyFXtyu86kQ3j5u2Nqvvc", "Graphic ad 2"],
          ["p", "1QKrd26NuARg1a3QUdbzOUXijm2GVgWHi", "HR1 changes web page"]
        ]},
        { title: "Multilingual transit ads", folder: "1sszsEjz3gWEOmssOFul9Gdk2W_iN16jd", items: [
          ["i", "1m1HxBea6s565oYG3E-K3gz1ynczSySvg", "Spanish, in-bus card"],
          ["i", "1rC6PVVSm3Fkxthb3suwh82o8iTqcE0K7", "Vietnamese, in-bus card"],
          ["i", "1c4hzMSe5v4JsxTcpK9KVAYEKFcUQuRQf", "Russian, in-bus card"],
          ["i", "1uXIBGNtbhCPIxqAWWoPJKP-6zF2WdCKz", "Tagalog, in-bus card"],
          ["p", "1yO5rNipXS8lxEcryha_zQSGj8No21yU9", "Interior bus cards"]
        ]},
        { title: "Community care hub referral campaign", folder: "1OmiKeCzyslbf_e3_wCe_Q1gH_HfFhZMq", subs: [
          { title: "Results and overview", items: [
            ["p", "1Z_02JSRwyX7V895XB3Qb1Co6QsMBRRWy", "10-day results"],
            ["p", "1gP1FBTA2daAA0cQLRRZm3UgginFV5zj0", "6-month results"],
            ["p", "1zmTsJRwoGaLzpazCZwfNlchDAjPY3ewI", "Campaign overview presentation"]
          ]},
          { title: "Launch announcement and graphic ads", items: [
            ["p", "1QzmUrxuS0WNs37SwGG4jenGh7lYpNtRk", "Launch announcement"],
            ["p", "1bQERDNUcfxpaacoC5ijpVKUPdMnzP1Hd", "All graphic ads"]
          ]},
          { title: "Video ads, round 1", items: [
            ["v", "11Oi797r4Xwt5cWlesk3dTV77wuTfrW3Q", "Joseph: Fill out the form"],
            ["v", "1ihe4KtKa9vl_rIrQ-nOT8XK9OxnUWMvF", "Alli: Fill out the form"],
            ["v", "1rINY1G49o2vnpKS751C-AY0J5brMbd9C", "Ariana: Fill out the form"]
          ]},
          { title: "Video ads, round 2", items: [
            ["v", "1iNfkxovQNhLcL8Y-CdhsSf5Wlnuj5ddD", "Sara: Fill out the form"],
            ["v", "1gTlQMzYXRJAY6plFRhYz6kSybq9MayvT", "Derrick: Fill out the form"],
            ["v", "19kiWZ9TvwPcNGIvflnrpGC8t21WOaYCf", "Joseph: Give us a call"],
            ["v", "18gl_ZZgUhpRt4niiKE6ghj-nCm-4paNH", "Paloma: Give us a call"],
            ["v", "1-C1DvuS0efbzG4G_8L4NsGYWM6tuOoPg", "Julia: Give us a call"],
            ["v", "1qFsb3n004_98XbywFg9nFrOvVvuUqpvQ", "Zach: Give us a call"]
          ]},
          { title: "Praise for campaign success", items: [
            ["i", "1okFJ2CjySxcXabHZdhYTgbHVGpUyKv6j", "Program lead on results"],
            ["i", "1k32PxWyuIHrUcXbTX9ENANYM8g5exU9E", "Comms director on quality"],
            ["i", "1nQLPOuuWrcsGLHZLKWVjlNylNfHvQEdk", "Comms director on success"],
            ["i", "1ujB4oy1jUdkwuhMDQQA1saVs4DCsRc0X", "Executive director on results"],
            ["i", "1rs_VlkmV0PLCgtJz1ztFCNOEJdlEFCNo", "Product manager on targeting"],
            ["i", "1pDb9JnPAucXlHR6FVJaEmCTgRUugEITO", "Program lead on referral increase"],
            ["i", "1LdpqvoW6OqGsmR9Z9aKx-Eo-2z5w5nj8", "Needing to increase capacity"]
          ]}
        ]}
      ]},
      { title: "Social media content", sections: [
        { title: "Joseph Explains", folder: "1dPI6HKA8VodZpHzqtDgnFqLhKwN7KU08", items: [
          ["v", "1iUZzFCwyq_g_WGtfIVux5-ji6VRC8a8_", "How to apply for Apple Health"],
          ["v", "1ixJUWEauV2_fnKjSWAp2tuzHiNUhd3IV", "Save on Wi-Fi"],
          ["v", "1G7RxkUmbIQd_xelqDD2YONvwUrvKfPt6", "Primary care"],
          ["v", "1e7mZsm2BxSJhVapLkeLrmxMH_XeazcJ1", "Why immunizations matter"],
          ["v", "1AEZlm_CXgWPP_lkGtAZkUx0p_jeiLe4q", "Emergency planning"],
          ["v", "1ktCMcxxK1hZsVS6F9TLWaqhMMFe3K9j5", "What is a CBW"],
          ["v", "1CBneZSbrGQf8-9H3_6qe5tWmNZkGT_MB", "Mental health resources"]
        ]}
      ]},
      { title: "Graphic design", sections: [
        { title: "Print materials", folder: "1_lxYo4O5ufXfmoAarcdjHhlyA9sBnkSq", items: [
          ["p", "1jjSjGMm6EPoYFXBT2N1p-znrVtP5Y9hE", "One Pierce one-pager"],
          ["p", "11xit7LAdKvsImIbTAkGMGxvZmFKxfyXs", "One Pierce brochure"],
          ["p", "107OVCv3RkQShEib6GK27-shv89z_jSrC", "Translated notecards"],
          ["p", "1srCU0PlatwvoryxwatOYIDllXnspte_8", "Translated posters"],
          ["p", "1UaViaPy8cIUjdHWPpVc1ufpcb78R1gr-", "Translated brochures"]
        ]}
      ]}
    ]
  },
  {
    slug: "joseph-danny-llc",
    name: "Joseph Danny, LLC",
    role: "Independent practice",
    intro: "Paid social campaigns for insurance and church clients, plus brochure design.",
    groups: [
      { title: "Paid ad campaigns", sections: [
        { title: "Veitch Agency, insurance", folder: "1yGhf05GwD7I2Ra5gEZbSydEMne5HTWc3", items: [
          ["v", "1o7aNz2atJmIYZ4RbAgZ2rqvcpmvgDiHp", "Micah: COI"],
          ["v", "12lxX73qgMsx_dbk5YgaAQ7O8oYonpz0P", "Micah: Lawsuit"],
          ["v", "1OnS2Eqg9lPIAToVj5i1VQowmuoYNypVh", "Connor: A decade of experience"],
          ["v", "1JviiKYRGpS772mdT2hATjQamZkLpaviN", "Connor: Tailored underwriting"],
          ["v", "1yIn3AZ0sGQWfZlYxAjjGvMFpxyPDsXxR", "Connor: Hundreds of policies"]
        ]},
        { title: "The Table Church", folder: "191qPlq5IZaVFe4PH3GHBBSSsxyxDsJ2T", items: [
          ["v", "1_PjpbcRldxNdc2YxiCFZXFe2ZikCh1ez", "Pastor Beth"],
          ["v", "1z-IGcYYTMBDbcunqinSzLgrv-lt19kwr", "Pastor Jen"],
          ["v", "1G_XD12kkAEaEpV6Wl2cvODvWZQLcGaxD", "Pastor Arianna"],
          ["v", "1K73-3KiCemj4waVmQXnwOVjbB6nG3QCK", "Tabitha"],
          ["v", "1Pzl9y_ABjHif3POVWJHoA_w6Sy6N830l", "Joseph"]
        ]}
      ]},
      { title: "Graphic design", sections: [
        { title: "Brochures", items: [
          ["p", "1qbQg0vmDeiHs8l10iqDakNbuXueqCglC", "NWMN brochure"],
          ["p", "1AJhk1MB-Tim8LzTTwOlO1ydVQkkbd-uf", "Hope Givers brochure"]
        ]}
      ]}
    ]
  },
  {
    slug: "blue-zones-project",
    name: "Blue Zones Project",
    role: "Marketing and Engagement Lead, 2023 to 2025",
    intro: "Interview films, short-form video, newsletters, signage, presentations, and ad creative for the Blue Zones Project.",
    groups: [
      { title: "Video projects", sections: [
        { title: "Long-form interviews", folder: "1XBCjGuTmwEW3JwrOF91NZe9oQ0bp6H8k", items: [
          ["v", "1tPg44UT_ZHEFMBuc5jPR5Nde5jt1ZTQh", "Dan Burden"],
          ["v", "1sqgeQ1sfjYn7LrLcWgqYeCtzRBCOnwhv", "Jani Hitchen"],
          ["v", "1XfWgW67ePfoKQSEkdlIGa2Dtkm183Ixz", "Rachel Kelly"],
          ["v", "1OA-NMxgpgCKA2ZT5Es1oHEn0Iqnf1INh", "Marianne Lincoln"],
          ["v", "1wHqwIAvYaSFDeMBifJWQ3qmrLQF9XKZX", "Susan Armbruster"]
        ]},
        { title: "Short-form", folder: "1dKoxs3wyRl8i8yOOPdkJvv6357ybvT1C", items: [
          ["v", "1gsiLyO47mGCHCtvVQ0mNNFPJG5t3fIpR", "Zumba invite"],
          ["v", "1WZC-KcWGNA5CgArm-FqQBLdL8zv5HDZc", "H4H reel"],
          ["v", "1NSxTjBgpv9VNUIAfM2nmj2C4kONUg1Y2", "BZ Friends tweet video"],
          ["v", "1OvKHK0JwWIHCB9EQ7f8T_0ev3xmw68Rv", "Christmas picture"]
        ]}
      ]},
      { title: "Paid ads", sections: [
        { title: "Video ads", folder: "1UPSUoNg5vYhLKuUT6QSlvQJ6Bc61vako", items: [
          ["v", "1ou79kUVM-s5Ji13NU_Dk-2VkzWISwihN", "Zumba ad"],
          ["v", "1Gca8gQegw9o_wNAUFyoB6QgPAxH4lK3o", "Cooking ad, version 1"],
          ["v", "1yvrYxG2IndcTV6I2am2UU4DbDBXQGovr", "Cooking ad, version 2"]
        ]},
        { title: "Graphic ads", folder: "18soe9KAv10cBOr-rWzTzG1bJSpWGVmd8", items: [
          ["i", "1hw8GiYjGBOMNRzKPanW2nO-R2Jo14qNQ", "Yoga"],
          ["i", "1HT2MKRaGFaYnUcpOpXNBHW2bu4QdV3yT", "Cooking"],
          ["i", "1nveGWd3TzGdRIe9878tOUTkRCu2SVFFG", "Zumba"]
        ]}
      ]},
      { title: "Graphic design", sections: [
        { title: "Design", folder: "1vGowKlP9f-MdVg4L8xMvNgSynaEZBrSZ", items: [
          ["i", "14emNQ-dolgH5KsX_d1sDFQH-x_mvboUo", "Design 1"],
          ["i", "1s6JQfSc9P6aGnKt6zRjGMpVVwhcUqkk6", "Design 2"],
          ["i", "1aYQzB7BdPrq-r8e0aEIYPonvc61qrtxX", "Design 3"],
          ["i", "1FkPfKJ3ZuuhA3bEff6ixI2T8VZpqaWj9", "Design 4"],
          ["i", "1bs1fozsiGK41yuYapESLRlfuXHgn_u3q", "Design 5"]
        ]},
        { title: "Signage", folder: "1UeSixPcXmQSpxvxgR-JDjzf9jxqzS9eS", items: [
          ["i", "1Vsw4EvPNQpNrunTJO9r4OBfLiZ5AUCEi", "Walking School Bus sign"],
          ["i", "1Y-KBdTudw0IcPHN5NJZVXzdavfhF-9pi", "Healthy Cooking sign"],
          ["i", "1rooQHicUsfOCnP_kwB72gVJFGMWQb0A1", "BZ Day sign"],
          ["i", "1nRDmPpjp2ydJSz8kyqVZ4sAsIJnxjefd", "Parking sign, blue"],
          ["i", "1dyiIswNu6fP5mDBJOJ8F91A2GJXpYK4U", "Parking sign, white"]
        ]},
        { title: "Social media graphics", folder: "1zxl3Nyck8GvceOUAOnNbOp9sWraepNxT", items: [
          ["i", "1Qv6cXN2W6uT-oVbUUhS7VSGo_C5JkcON", "Graphic 1"],
          ["i", "1DzMwOR9VXyXYqrPKTgG4gwyN4NyHyeG0", "Graphic 2"],
          ["i", "1hGzKdNccbSEicIQ7g3Fp9Ob-h0EUxKwd", "Graphic 3"],
          ["i", "1mofZAwBn9iktdo-6bpYUrc6WwtXq0VT8", "Graphic 4"],
          ["i", "1OxGSypfN9S6Lq483JbRBykUgkwphxd-4", "Graphic 5"]
        ]},
        { title: "Newsletters", folder: "1RZ58XSOBM2igVWiYy36NVdLS4bNJAuT1", items: [
          ["p", "1ZPZY88wWrBNJWOhQ6RKTXaadYSKiXj0I", "November newsletter"],
          ["p", "1ozS00wl494GTkpWwgC9Pmns2qNEdRZTe", "February newsletter"]
        ]},
        { title: "Presentations", folder: "1vscLDnNAQqshtIPG7zwKENsZYIKQtJvV", items: [
          ["p", "1duv6-3mdUPjqD5_O8qypxt0VOaQ2wM2g", "BZP story speech"],
          ["p", "1weviQnJdV9sGCw6R5jOCSJgg0Vut1YNX", "Healthy Cooking Made Simple: Tofu"]
        ]}
      ]},
      { title: "Articles", sections: [
        { title: "Press and features", folder: "1NCPiMrlAeT0Y4aSkys513xncIjUpYPld", items: [
          ["p", "1AhFyOcYtyAU7ZeG0jvRHVT36gObSJKQ1", "New executive director, South Sound Magazine"],
          ["p", "1E57JTKUPVq-J7GRQgoHHatWvRGFtBfMg", "New executive director, The Suburban Times"],
          ["p", "1DU_PWPbLCyVl3SHUKcPMDTTKq4FVhXLo", "New executive director, Showcase Media"],
          ["p", "1oJQdTKhmlupEBysnGR83TzZ2phuwG0i-", "Brookdale Elementary, The Suburban Times"],
          ["p", "1IZpbKA9gI7G8rUe_hkm1rffZpMqrB9Bv", "Berta Rivera, Blue Zones"]
        ]}
      ]}
    ]
  },
  {
    slug: "certifications",
    name: "Awards and certifications",
    role: "Credentials",
    intro: "Recognition and platform certifications.",
    groups: [
      { title: "", sections: [
        { title: "", folder: "13ZSABT4229OQ5ncuKvY__gLjw05RYk9I", items: [
          ["i", "1o50VhUOpHNvDtcc1aFs02Hse_CBb2BMn", "40 Under 40 Award"],
          ["p", "1rBZQz9ED8cthxfq0f7KhdVKdv_a5J1lE", "Meta Certified Media Buying Professional"],
          ["p", "1SoUQ_lkaOC24alWBHCUgAtRh8PASW8G4", "Google Ads Video Certification"]
        ]}
      ]}
    ]
  }
];

