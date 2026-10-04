/**
 * High-Resolution Certificate Generator for Smart Kids Lab
 * Generates an official, beautiful landscape diploma (1600x1130 px)
 * that can be downloaded as PNG or printed directly.
 * Cleanly isolates French (100% pure French) and Arabic (100% pure Arabic).
 */

export interface CertificateData {
  childName: string;
  level: number;
  xp: number;
  rankName: string;
  rankIcon: string;
  avatar: string;
  theme?: 'gold' | 'morocco' | 'cyber';
  lang?: 'fr' | 'ar';
}

export function generateCertificateCanvas(data: CertificateData): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1130;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context non disponible');

  const width = canvas.width;
  const height = canvas.height;
  const theme = data.theme || 'morocco';
  const isAr = data.lang === 'ar';

  // Theme palettes
  const palettes = {
    gold: {
      bg1: '#fffefb',
      bg2: '#fbf7ed',
      primaryBorder: '#b45309', // Dark gold
      accentBorder: '#fbbf24', // Bright gold
      innerBorder: '#d97706',
      titleColor: '#1e3a8a', // Royal Navy
      sealBg: '#fef3c7',
      sealBorder: '#d97706',
      cardBorder: '#fcd34d',
      ribbonBg: '#fef3c7',
      ribbonText: '#92400e',
      kickerText: '#b45309',
      sealEmoji: '🏆'
    },
    morocco: {
      bg1: '#ffffff',
      bg2: '#f8faf9',
      primaryBorder: '#b91c1c', // Moroccan Crimson
      accentBorder: '#059669', // Moroccan Emerald
      innerBorder: '#d97706', // Gold
      titleColor: '#064e3b', // Deep Emerald
      sealBg: '#ecfdf5',
      sealBorder: '#059669',
      cardBorder: '#6ee7b7',
      ribbonBg: '#fef2f2',
      ribbonText: '#991b1b',
      kickerText: '#047857',
      sealEmoji: '🇲🇦'
    },
    cyber: {
      bg1: '#0f172a',
      bg2: '#020617',
      primaryBorder: '#06b6d4', // Cyan
      accentBorder: '#8b5cf6', // Violet
      innerBorder: '#3b82f6', // Electric Blue
      titleColor: '#38bdf8', // Neon Sky
      sealBg: '#1e293b',
      sealBorder: '#06b6d4',
      cardBorder: '#0ea5e9',
      ribbonBg: '#1e1b4b',
      ribbonText: '#c084fc',
      kickerText: '#22d3ee',
      sealEmoji: '⚡'
    }
  };

  const p = palettes[theme];
  const isDark = theme === 'cyber';

  // 1. Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, p.bg1);
  bgGrad.addColorStop(0.5, isDark ? '#0b1120' : '#ffffff');
  bgGrad.addColorStop(1, p.bg2);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle background guilloche watermark
  ctx.save();
  ctx.globalAlpha = isDark ? 0.05 : 0.035;
  ctx.fillStyle = isDark ? '#38bdf8' : '#1e3a8a';
  for (let x = 80; x < width - 80; x += 110) {
    for (let y = 80; y < height - 80; y += 110) {
      ctx.font = '24px sans-serif';
      ctx.fillText(theme === 'morocco' ? '★' : '✦', x, y);
    }
  }
  ctx.restore();

  // 2. Ornate Multi-layer Borders
  ctx.save();
  // Outer border
  ctx.lineWidth = 14;
  ctx.strokeStyle = p.primaryBorder;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // Middle accent border
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = p.accentBorder;
  ctx.strokeRect(43, 43, width - 86, height - 86);

  // Inner fine border
  ctx.lineWidth = 2;
  ctx.strokeStyle = p.innerBorder;
  ctx.strokeRect(56, 56, width - 112, height - 112);

  // Four ornate corner stars
  const corners = [
    [56, 56],
    [width - 56, 56],
    [56, height - 56],
    [width - 56, height - 56]
  ];
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fillStyle = p.sealBg;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = p.primaryBorder;
    ctx.stroke();

    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = p.primaryBorder;
    ctx.fillText('★', cx, cy);
  });
  ctx.restore();

  // 3. Header & Brand (Strictly Isolated by language)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  ctx.font = 'bold 36px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
  ctx.fillText(isAr ? 'سمارت كيدز لاب' : 'SMART KIDS LAB', width / 2, 85);

  ctx.font = '600 16px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
  ctx.fillText(
    isAr ? 'المنصة التعليمية الرائدة للذكاء الاصطناعي والبرمجة والمنطق للأطفال' : 'Apprendre · Créer · Explorer · Préparer demain',
    width / 2,
    130
  );

  // Ribbon Header
  ctx.save();
  const ribbonY = 170;
  const ribbonW = 580;
  const ribbonH = 42;
  const ribbonX = (width - ribbonW) / 2;

  ctx.fillStyle = p.ribbonBg;
  ctx.beginPath();
  ctx.roundRect(ribbonX, ribbonY, ribbonW, ribbonH, 12);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = p.primaryBorder;
  ctx.stroke();

  ctx.font = 'bold 15px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = p.ribbonText;
  ctx.textBaseline = 'middle';
  const ribbonLabel = isAr
    ? '★ شـهـادة الـتـفـوق والـتـمـيـز الـرسـمـيـة ★'
    : '★ CERTIFICAT D’APTITUDE & D’HONNEUR NUMÉRIQUE ★';
  ctx.fillText(ribbonLabel, width / 2, ribbonY + ribbonH / 2);
  ctx.restore();

  // 4. Main Certificate Title
  ctx.textBaseline = 'top';
  ctx.font = '900 48px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = p.titleColor;
  const mainTitle = isAr
    ? 'شـهـادة الـتـخـرج والابـتـكـار'
    : 'DIPLÔME DE L’EXPLORATEUR';
  ctx.fillText(mainTitle, width / 2, 235);

  // Subtitle
  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillStyle = isDark ? '#cbd5e1' : '#475569';
  const subTitle = isAr
    ? 'يُمنح هذا الدبلوم الشرفي الرسمي بكل فخر واعتزاز إلى المبدع(ة) :'
    : 'Ce diplôme officiel est décerné avec toutes les félicitations à :';
  ctx.fillText(subTitle, width / 2, 310);

  // 5. Child's Name with Avatar
  const nameY = 360;

  // Avatar Circle
  ctx.save();
  const avatarX = isAr ? width / 2 + 250 : width / 2 - 250;
  ctx.beginPath();
  ctx.arc(avatarX, nameY + 36, 46, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#1e293b' : '#eff6ff';
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = p.accentBorder;
  ctx.stroke();

  ctx.font = '50px sans-serif';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(data.avatar || '🚀', avatarX, nameY + 38);
  ctx.restore();

  // Name
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = '900 56px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = isDark ? '#ffffff' : '#0f172a';
  const nameX = isAr ? width / 2 - 20 : width / 2 + 20;
  ctx.fillText(data.childName, nameX, nameY);

  // Elegant golden underline under the name
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(width / 2 - 200, nameY + 72);
  ctx.lineTo(width / 2 + 200, nameY + 72);
  ctx.lineWidth = 3;
  ctx.strokeStyle = p.primaryBorder;
  ctx.stroke();

  // Diamond accent in center
  ctx.fillStyle = p.accentBorder;
  ctx.fillRect(width / 2 - 4, nameY + 68, 8, 8);
  ctx.restore();

  // 6. Commendation paragraph
  ctx.font = '500 20px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = isDark ? '#cbd5e1' : '#334155';
  if (isAr) {
    ctx.fillText('تقديراً لاجتيازه بنجاح وتفوق باهر كافة التحديات العلمية في التفكير المنطقي،', width / 2, 465);
    ctx.fillText('والبرمجة الخوارزمية، ومبادئ الذكاء الاصطناعي والإبداع الرقمي المستقبلي', width / 2, 500);
    ctx.fillText('على منصة سمارت كيدز لاب التعليمية المعتمدة لعام 2026.', width / 2, 535);
  } else {
    ctx.fillText('Pour avoir accompli avec succès et curiosité les épreuves d’initiation aux sciences', width / 2, 465);
    ctx.fillText('de la Logique, des Algorithmes, de la Programmation, de l’Intelligence Artificielle', width / 2, 498);
    ctx.fillText('et de la Créativité Numérique sur la plateforme interactive Smart Kids Lab.', width / 2, 531);
  }

  // 7. Stat Cards Grid (3 Columns)
  const cardY = 595;
  const cardW = 380;
  const cardH = 145;
  const cardGap = 40;
  const totalCardsW = 3 * cardW + 2 * cardGap;
  const startX = (width - totalCardsW) / 2;

  const stats = [
    {
      label: isAr ? 'المستوى الأكاديمي' : 'NIVEAU OFFICIEL',
      val: isAr ? `المستوى ${data.level}` : `NIVEAU ${data.level}`,
      sub: isAr ? 'تقدم مستمر ومثابر' : 'Progression continue',
      color: isDark ? '#38bdf8' : '#1d4ed8',
      bg: isDark ? '#1e293b' : '#eff6ff',
      borderColor: isDark ? '#0284c7' : '#93c5fd'
    },
    {
      label: isAr ? 'الرتبة الشرفية' : 'RANG HONORIFIQUE',
      val: `${data.rankIcon} ${data.rankName}`,
      sub: isAr ? 'لقب معتمد ومسجل' : 'Grade académique validé',
      color: isDark ? '#fbbf24' : '#b45309',
      bg: isDark ? '#1e293b' : '#fef3c7',
      borderColor: isDark ? '#d97706' : '#fcd34d'
    },
    {
      label: isAr ? 'نقاط التميز' : 'POINTS D’EXPÉRIENCE',
      val: isAr ? `${data.xp.toLocaleString('fr-FR')} نقطة` : `${data.xp.toLocaleString('fr-FR')} XP`,
      sub: isAr ? 'مجموع التحديات المنجزة' : 'Connaissances et défis validés',
      color: isDark ? '#34d399' : '#047857',
      bg: isDark ? '#1e293b' : '#ecfdf5',
      borderColor: isDark ? '#059669' : '#a7f3d0'
    }
  ];

  stats.forEach((st, idx) => {
    const x = startX + idx * (cardW + cardGap);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, cardY, cardW, cardH, 16);
    ctx.fillStyle = st.bg;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = st.borderColor;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    ctx.font = '800 13px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.fillText(st.label, x + cardW / 2, cardY + 20);

    ctx.font = '900 28px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = st.color;
    ctx.fillText(st.val, x + cardW / 2, cardY + 50);

    ctx.font = '600 13px "Segoe UI", Arial, sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.fillText(st.sub, x + cardW / 2, cardY + 100);
    ctx.restore();
  });

  // 8. Seal and Signatures (Footer)
  const footerY = 800;

  // Left: Date and Certification text
  ctx.textAlign = isAr ? 'right' : 'left';
  ctx.textBaseline = 'top';
  ctx.font = '600 15px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = isDark ? '#cbd5e1' : '#64748b';
  const currentDate = new Date().toLocaleDateString(isAr ? 'ar-MA' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const dateX = isAr ? width - 120 : 120;
  ctx.fillText(isAr ? 'تاريخ الإصدار : ' + currentDate : 'Délivré le : ' + currentDate, dateX, footerY + 40);
  ctx.font = 'italic 14px Georgia, serif';
  ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
  const certId = 'SKL-' + (theme === 'morocco' ? 'MA-' : '') + Math.abs(data.childName.split('').reduce((a, b) => a + b.charCodeAt(0), 1000) * 89).toString();
  ctx.fillText(isAr ? 'رقم الاعتماد الرقمي : ' + certId : 'Certificat authentique n° ' + certId, dateX, footerY + 70);

  // Center: Official Gold Seal Medal
  ctx.save();
  const sealX = width / 2;
  const sealY = footerY + 80;

  // Outer glow
  ctx.beginPath();
  ctx.arc(sealX, sealY, 72, 0, Math.PI * 2);
  ctx.fillStyle = p.sealBg;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = p.primaryBorder;
  ctx.stroke();

  // Inner ring
  ctx.beginPath();
  ctx.arc(sealX, sealY, 58, 0, Math.PI * 2);
  ctx.fillStyle = isDark ? '#0f172a' : '#fef08a';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = p.accentBorder;
  ctx.stroke();

  ctx.font = '40px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(p.sealEmoji, sealX, sealY - 8);

  ctx.font = '900 10px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = p.primaryBorder;
  ctx.fillText(isAr ? 'الامتياز والتميز' : 'EXCELLENCE', sealX, sealY + 28);
  ctx.fillText('★ 2026 ★', sealX, sealY + 40);
  ctx.restore();

  // Right/Left: Pedagogical Signature
  const sigX = isAr ? 120 : width - 120;
  ctx.textAlign = isAr ? 'left' : 'right';
  ctx.textBaseline = 'top';
  ctx.font = 'italic 16px Georgia, serif';
  ctx.fillStyle = isDark ? '#cbd5e1' : '#64748b';
  ctx.fillText(isAr ? 'عن الإدارة البيداغوجية،' : 'Pour la Direction Pédagogique,', sigX, footerY + 25);

  ctx.font = '900 22px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = p.titleColor;
  ctx.fillText(isAr ? 'أكاديمية سمارت كيدز لاب' : 'Smart Kids Lab Académie', sigX, footerY + 55);

  // Signature flourish
  ctx.save();
  ctx.strokeStyle = p.accentBorder;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  if (isAr) {
    ctx.moveTo(120, footerY + 95);
    ctx.bezierCurveTo(170, footerY + 75, 200, footerY + 115, 260, footerY + 85);
    ctx.bezierCurveTo(290, footerY + 65, 310, footerY + 110, 350, footerY + 90);
  } else {
    ctx.moveTo(width - 320, footerY + 95);
    ctx.bezierCurveTo(width - 270, footerY + 75, width - 240, footerY + 115, width - 180, footerY + 85);
    ctx.bezierCurveTo(width - 150, footerY + 65, width - 130, footerY + 110, width - 90, footerY + 90);
  }
  ctx.stroke();
  ctx.restore();

  // Bottom Legal line
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.font = '500 12px "Segoe UI", Arial, sans-serif';
  ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
  ctx.fillText(
    isAr
      ? 'سمارت كيدز لاب · المنصة التعليمية الرائدة للعلوم والتقنيات الرقمية للأطفال · جميع الحقوق محفوظة 2026'
      : 'Smart Kids Lab · Plateforme Éducative d’Éveil aux Sciences & Technologies du Futur · Tous droits réservés',
    width / 2,
    height - 60
  );

  return canvas;
}

/**
 * Downloads the certificate directly as a high-resolution PNG image file
 */
export async function downloadCertificateImage(data: CertificateData): Promise<void> {
  const canvas = generateCertificateCanvas(data);
  const dataUrl = canvas.toDataURL('image/png');

  const cleanName = data.childName.trim().toLowerCase().replace(/[^a-z0-9]/gi, '_') || 'enfant';
  const suffix = data.lang === 'ar' ? 'ar' : 'fr';
  const fileName = `diplome_${cleanName}_${suffix}_smartkidslab.png`;

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Opens a print-friendly window or iframe with the generated certificate
 */
export async function printCertificateDirectly(data: CertificateData): Promise<boolean> {
  try {
    const canvas = generateCertificateCanvas(data);
    const dataUrl = canvas.toDataURL('image/png');

    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'fixed';
    printFrame.style.right = '0';
    printFrame.style.bottom = '0';
    printFrame.style.width = '0';
    printFrame.style.height = '0';
    printFrame.style.border = 'none';

    document.body.appendChild(printFrame);

    const frameDoc = printFrame.contentWindow?.document;
    if (!frameDoc) {
      await downloadCertificateImage(data);
      return false;
    }

    frameDoc.open();
    frameDoc.write(`
      <!DOCTYPE html>
      <html dir="${data.lang === 'ar' ? 'rtl' : 'ltr'}">
        <head>
          <title>${data.lang === 'ar' ? 'شهادة سمارت كيدز لاب' : 'Diplôme Smart Kids Lab'} - ${data.childName}</title>
          <style>
            @page {
              size: landscape;
              margin: 0;
            }
            body {
              margin: 0;
              padding: 0;
              background-color: white;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
            }
            img {
              max-width: 100%;
              max-height: 100%;
              width: auto;
              height: auto;
              display: block;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" alt="Diplôme Smart Kids Lab" />
          <script>
            window.onload = function() {
              try {
                window.focus();
                window.print();
              } catch (e) {
                console.error(e);
              }
            };
          </script>
        </body>
      </html>
    `);
    frameDoc.close();

    setTimeout(() => {
      if (document.body.contains(printFrame)) {
        document.body.removeChild(printFrame);
      }
    }, 10000);

    return true;
  } catch (err) {
    console.error('Erreur lors de l’impression, bascule sur téléchargement direct:', err);
    await downloadCertificateImage(data);
    return false;
  }
}
