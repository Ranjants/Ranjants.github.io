document.addEventListener("DOMContentLoaded", function () {

    // Get a reference to the export button
    var exportButton = document.getElementById('exportButton');
    var downloadLink = document.getElementById('downloadLink');

    // Add an event listener to the export button
    exportButton.addEventListener('click', function () {
        // Use html2canvas to capture the live preview
        html2canvas(livePreview, { scale: 2 }).then(function (canvas) {
            // Convert the canvas to a data URL
            var imageData = canvas.toDataURL();

            // Set the data URL as the href attribute of the download link
            downloadLink.href = imageData;

            // Trigger a click on the download link
            downloadLink.click();
        });
    });


    // Get references to the textarea and live preview elements
    var textEditor = document.getElementById('text-editor');
    var livePreview = document.getElementById('live-preview');

    // Add an event listener to the textarea for input changes
    textEditor.addEventListener('input', function () {
        // Get the LaTeX code from the textarea value
        var latexCode = textEditor.value;

        // Render the LaTeX code using KaTeX in the live preview
        try {
            katex.render(latexCode, livePreview, { displayMode: true });
        } catch (err) {
            console.error(err);
        }   
    });

    // Function to insert KaTeX command at the current cursor position in the textarea
    window.insertText = function (prefix, suffix) {
        suffix = suffix || '';

        var cursorPos = textEditor.selectionStart;
        var textBefore = textEditor.value.substring(0, cursorPos);
        var textAfter = textEditor.value.substring(cursorPos);
        textEditor.value = textBefore + prefix + textAfter + suffix;
        // Trigger input event to update live preview
        textEditor.dispatchEvent(new Event('input'));
    };

    // Import the latex functions
    const latexFunctions = {
        delimiters: [
            { command: '\\lparen' },
            { command: '\\rparen' },
            { command: '\\lbrack' },
            { command: '\\rbrack' },
            { command: '\\lbrace' },
            { command: '\\rbrace' },
            { command: '\\langle' },
            { command: '\\rangle' },
            { command: '\\vert' },
            { command: '\\Vert' },
            { command: '\\lVert' },
            { command: '\\rVert' },
            { command: '\\lt' },
            { command: '\\gt' },
            { command: '\\lceil' },
            { command: '\\rceil' },
            { command: '\\lfloor' },
            { command: '\\rfloor' },
            { command: '\\lmoustache' },
            { command: '\\rmoustache' },
            { command: '\\lgroup' },
            { command: '\\rgroup' },
            { command: '\\ulcorner' },
            { command: '\\urcorner' },
            { command: '\\llcorner' },
            { command: '\\lrcorner' },
            { command: '\\llbracket' },
            { command: '\\rrbracket' },
            { command: '\\uparrow' },
            { command: '\\downarrow' },
            { command: '\\updownarrow' },
            { command: '\\Uparrow' },
            { command: '\\Downarrow' },
            { command: '\\Updownarrow' },
            { command: '\\backslash' },
            { command: '\\lBrace' },
            { command: '\\rBrace' },
        ],
        environments: [
            { command: '\\begin{matrix} a & b \\\\ c & d \\end{matrix}' },
            { command: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}' },
            { command: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}' },
            { command: '\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}' },
            { command: '\\begin{Vmatrix} a & b \\\\ c & d \\end{Vmatrix}' },
            { command: '\\begin{Bmatrix} a & b \\\\ c & d \\end{Bmatrix}' },
            { command: '\\def\\arraystretch{1.5} \\begin{array}{c:c:c} a & b & c \\\\ \\hline d & e & f \\\\ \\hdashline g & h & i \\end{array}' },
            { command: 'x = \\begin{cases} a &\\text{if } b \\\\ c &\\text{if } d \\end{cases}' },
            { command: '\\begin{rcases} a &\\text{if } b \\\\ c &\\text{if } d \\end{rcases}⇒…' },
            { command: '\\sum_{ \\begin{subarray}{l} i\\in\\Lambda\\\\ 0<j<n \\end{subarray}}' },
        ],
        accents: [
            { command: 'a\'' },
            { command: 'a\'\'' },
            { command: 'a^\\prime' },
            { command: '\\acute{a}' },
            { command: '\\bar{y}' },
            { command: '\\breve{a}' },
            { command: '\\check{a}' },
            { command: '\\dot{a}' },
            { command: '\\ddot{a}' },
            { command: '\\grave{a}' },
            { command: '\\hat{\\theta}' },
            { command: '\\widehat{ac}' },
            { command: '\\tilde{a}' },
            { command: '\\widetilde{ac}' },
            { command: '\\utilde{AB}' },
            { command: '\\vec{F}' },
            { command: '\\overleftarrow{AB}' },
            { command: '\\underleftarrow{AB}' },
            { command: '\\overleftharpoon{ac}' },
            { command: '\\overleftrightarrow{AB}' },
            { command: '\\underleftrightarrow{AB}' },
            { command: '\\overline{AB}' },
            { command: '\\underline{AB}' },
            { command: '\\widecheck{ac}' },
            { command: '\\mathring{g}' },
            { command: '\\overgroup{AB}' },
            { command: '\\undergroup{AB}' },
            { command: '\\Overrightarrow{AB}' },
            { command: '\\overrightarrow{AB}' },
            { command: '\\underrightarrow{AB}' },
            { command: '\\overrightharpoon{ac}' },
            { command: '\\overbrace{AB}' },
            { command: '\\underbrace{AB}' },
            { command: '\\overlinesegment{AB}' },
            { command: '\\underlinesegment{AB}' },
            { command: 'X\\underbar{X}' },
        ],
        logicAndSetTheory: [
            { command: '\\forall' },
            { command: '\\exists' },
            { command: '\\nexists' },
            { command: '\\in' },
            { command: '\\isin' },
            { command: '\\notin' },
            { command: '\\complement' },
            { command: '\\subset' },
            { command: '\\supset' },
            { command: '\\mid' },
            { command: '\\land' },
            { command: '\\lor' },
            { command: '\\ni' },
            { command: '\\Set{ x | x<\\frac 1 2 }' },
            { command: '\\therefore' },
            { command: '\\because' },
            { command: '\\mapsto' },
            { command: '\\to' },
            { command: '\\gets' },
            { command: '\\leftrightarrow' },
            { command: '\\notni' },
            { command: '\\set{x|x<5}' },
            { command: '\\emptyset' },
            { command: '\\empty' },
            { command: '\\varnothing' },
            { command: '\\implies' },
            { command: '\\impliedby' },
            { command: '\\iff' },
            { command: '\\neg or \\lnot' },
        ],
        bigOperators: [
            { command: "\\sum" },
            { command: "\\int" },
            { command: "\\iint" },
            { command: "\\iiint" },
            { command: "\\oint" },
            { command: "\\prod" },
            { command: "\\coprod" },
            { command: "\\intop" },
            { command: "\\smallint" },
            { command: "\\oiint" },
            { command: "\\bigotimes" },
            { command: "\\bigoplus" },
            { command: "\\bigodot" },
            { command: "\\biguplus" },
            { command: "\\oiiint" },
            { command: "\\bigvee" },
            { command: "\\bigwedge" },
            { command: "\\bigcap" },
            { command: "\\bigcup" },
            { command: "\\bigsqcup" }
        ],
        binaryOperators: [
            { command: "+" },
            { command: "-" },
            { command: "/" },
            { command: "*" },
            { command: "\\amalg" },
            { command: "\\And" },
            { command: "\\ast" },
            { command: "\\barwedge" },
            { command: "\\bigcirc" },
            { command: "\\bmod" },
            { command: "\\boxdot" },
            { command: "\\boxminus" },
            { command: "\\boxplus" },
            { command: "\\boxtimes" },
            { command: "\\bullet" },
            { command: "\\Cap" },
            { command: "\\cap" },
            { command: "\\cdot" },
            { command: "\\cdotp" },
            { command: "\\centerdot" },
            { command: "\\circ" },
            { command: "\\circledast" },
            { command: "\\circledcirc" },
            { command: "\\circleddash" },
            { command: "\\Cup" },
            { command: "\\cup" },
            { command: "\\curlyvee" },
            { command: "\\curlywedge" },
            { command: "\\div" },
            { command: "\\divideontimes" },
            { command: "\\dotplus" },
            { command: "\\doublebarwedge" },
            { command: "\\doublecap" },
            { command: "\\doublecup" },
            { command: "\\gtrdot" },
            { command: "\\intercal" },
            { command: "\\land" },
            { command: "\\leftthreetimes" },
            { command: "\\ldotp" },
            { command: "\\lor" },
            { command: "\\lessdot" },
            { command: "\\lhd" },
            { command: "\\ltimes" },
            { command: "x\\mod a" },
            { command: "\\mp" },
            { command: "\\odot" },
            { command: "\\ominus" },
            { command: "\\oplus" },
            { command: "\\otimes" },
            { command: "\\oslash" },
            { command: "\\plusmn" },
            { command: "x\\pmod{a}" },
            { command: "x \\pod a" },
            { command: "\\rhd" },
            { command: "\\rightthreetimes" },
            { command: "\\rtimes" },
            { command: "\\setminus" },
            { command: "\\smallsetminus" },
            { command: "\\sqcap" },
            { command: "\\sqcup" },
            { command: "\\times" },
            { command: "\\unlhd" },
            { command: "\\unrhd" },
            { command: "\\uplus" },
            { command: "\\vee" },
            { command: "\\veebar" },
            { command: "\\wedge" },
            { command: "\\wr" }
        ],
        fractionsAndBinomials: [
            { command: "\\frac{a}{b}" },
            { command: "a/b" },
            { command: "\\binom{n}{k}" },
            { command: "\\dfrac{a}{b}" },
            { command: "\\dbinom{n}{k}" },
            { command: "\\genfrac ( ] {2pt}{1}a{a+1}" },
            { command: "{a \\above{2pt} b+1}" },
            { command: "\\cfrac{a}{1 + \\cfrac{1}{b}}" },
            { command: "{n\\brace k}" },
            { command: "{n\\brack k}" }
        ],
        mathOperators: [
            { command: "\\arcsin" },
            { command: "\\cosec" },
            { command: "\\deg" },
            { command: "\\sec" },
            { command: "\\arccos" },
            { command: "\\cosh" },
            { command: "\\dim" },
            { command: "\\sin" },
            { command: "\\arctan" },
            { command: "\\cot" },
            { command: "\\exp" },
            { command: "\\sinh" },
            { command: "\\arctg" },
            { command: "\\cotg" },
            { command: "\\hom" },
            { command: "\\sh" },
            { command: "\\arcctg" },
            { command: "\\coth" },
            { command: "\\ker" },
            { command: "\\tan" },
            { command: "\\arg" },
            { command: "\\csc" },
            { command: "\\lg" },
            { command: "\\tanh" },
            { command: "\\ch" },
            { command: "\\ctg" },
            { command: "\\ln" },
            { command: "\\tg" },
            { command: "\\cos" },
            { command: "\\cth" },
            { command: "\\log" },
            { command: "\\th" },
            { command: "\\operatorname{f}" },
            { command: "\\argmax" },
            { command: "\\injlim" },
            { command: "\\min" },
            { command: "\\varinjlim" },
            { command: "\\argmin" },
            { command: "\\lim" },
            { command: "\\plim" },
            { command: "\\varliminf" },
            { command: "\\det" },
            { command: "\\liminf" },
            { command: "\\Pr" },
            { command: "\\varlimsup" },
            { command: "\\gcd" },
            { command: "\\limsup" },
            { command: "\\projlim" },
            { command: "\\varprojlim" },
            { command: "\\inf" },
            { command: "\\max" },
            { command: "\\sup" },
            { command: "\\operatorname*{f}" },
            { command: "\\operatornamewithlimits{f}" },
            { command: "\\sqrt{x}" },
            { command: "\\sqrt[3]{x}" },
        ],
        lettersUnicode: [
            { command: "\\Alpha" },
            { command: "\\Beta" },
            { command: "\\Gamma" },
            { command: "\\Delta" },
            { command: "\\Epsilon" },
            { command: "\\Zeta" },
            { command: "\\Eta" },
            { command: "\\Theta" },
            { command: "\\Iota" },
            { command: "\\Kappa" },
            { command: "\\Lambda" },
            { command: "\\Mu" },
            { command: "\\Nu" },
            { command: "\\Xi" },
            { command: "\\Omicron" },
            { command: "\\Pi" },
            { command: "\\Rho" },
            { command: "\\Sigma" },
            { command: "\\Tau" },
            { command: "\\Upsilon" },
            { command: "\\Phi" },
            { command: "\\Chi" },
            { command: "\\Psi" },
            { command: "\\Omega" },
            { command: "\\varGamma" },
            { command: "\\varDelta" },
            { command: "\\varTheta" },
            { command: "\\varLambda" },
            { command: "\\varXi" },
            { command: "\\varPi" },
            { command: "\\varSigma" },
            { command: "\\varUpsilon" },
            { command: "\\varPhi" },
            { command: "\\varPsi" },
            { command: "\\varOmega" },
            { command: "\\alpha" },
            { command: "\\beta" },
            { command: "\\gamma" },
            { command: "\\delta" },
            { command: "\\epsilon" },
            { command: "\\zeta" },
            { command: "\\eta" },
            { command: "\\theta" },
            { command: "\\iota" },
            { command: "\\kappa" },
            { command: "\\lambda" },
            { command: "\\mu" },
            { command: "\\nu" },
            { command: "\\xi" },
            { command: "\\omicron" },
            { command: "\\pi" },
            { command: "\\rho" },
            { command: "\\sigma" },
            { command: "\\tau" },
            { command: "\\upsilon" },
            { command: "\\phi" },
            { command: "\\chi" },
            { command: "\\psi" },
            { command: "\\omega" },
            { command: "\\varepsilon" },
            { command: "\\varkappa" },
            { command: "\\vartheta" },
            { command: "\\thetasym" },
            { command: "\\varpi" },
            { command: "\\varrho" },
            { command: "\\varsigma" },
            { command: "\\varphi" },
            { command: "\\digamma" }
        ],
        relations: [
            { "command": "=" },
            { "command": "\\doteqdot" },
            { "command": "\\lessapprox" },
            { "command": "\\smile" },
            { "command": "<" },
            { "command": "\\eqcirc" },
            { "command": "\\lesseqgtr" },
            { "command": "\\sqsubset" },
            { "command": ">" },
            { "command": "\\minuscolon" },
            { "command": "\\lesseqqgtr" },
            { "command": "\\sqsubseteq" },
            { "command": ":" },
            { "command": "\\minuscoloncolon" },
            { "command": "\\lessgtr" },
            { "command": "\\sqsupset" },
            { "command": "\\approx" },
            { "command": "\\equalscolon" },
            { "command": "\\lesssim" },
            { "command": "\\sqsupseteq" },
            { "command": "\\approxcolon" },
            { "command": "\\equalscoloncolon" },
            { "command": "\\ll" },
            { "command": "\\Subset" },
            { "command": "\\approxcoloncolon" },
            { "command": "\\eqsim" },
            { "command": "\\lll" },
            { "command": "\\sub" },
            { "command": "\\approxeq" },
            { "command": "\\eqslantgtr" },
            { "command": "\\llless" },
            { "command": "\\sube" },
            { "command": "\\asymp" },
            { "command": "\\eqslantless" },
            { "command": "\\lt" },
            { "command": "\\subseteqq" },
            { "command": "\\backepsilon" },
            { "command": "\\equiv" },
            { "command": "\\mid" },
            { "command": "\\succ" },
            { "command": "\\backsim" },
            { "command": "\\fallingdotseq" },
            { "command": "\\models" },
            { "command": "\\succapprox" },
            { "command": "\\backsimeq" },
            { "command": "\\frown" },
            { "command": "\\multimap" },
            { "command": "\\succcurlyeq" },
            { "command": "\\between" },
            { "command": "\\ge" },
            { "command": "\\origof" },
            { "command": "\\succeq" },
            { "command": "\\bowtie" },
            { "command": "\\ge" },
            { "command": "\\owns" },
            { "command": "\\succsim" },
            { "command": "\\bumpeq" },
            { "command": "\\geqq" },
            { "command": "\\parallel" },
            { "command": "\\Supset" },
            { "command": "\\Bumpeq" },
            { "command": "\\geqslant" },
            { "command": "\\perp" },
            { "command": "\\supset" },
            { "command": "\\circeq" },
            { "command": "\\gg" },
            { "command": "\\pitchfork" },
            { "command": "\\supseteq" },
            { "command": "\\colonapprox" },
            { "command": "\\ggg" },
            { "command": "\\prec" },
            { "command": "\\supseteqq" },
            { "command": "\\Colonapprox" },
            { "command": "\\gggtr" },
            { "command": "\\precapprox" },
            { "command": "\\thickapprox" },
            { "command": "\\coloneq" },
            { "command": "\\gt" },
            { "command": "\\preccurlyeq" },
            { "command": "\\thicksim" },
            { "command": "\\Coloneq" },
            { "command": "\\gtrapprox" },
            { "command": "\\preceq" },
            { "command": "\\trianglelefteq" },
            { "command": "\\coloneqq" },
            { "command": "\\gtreqless" },
            { "command": "\\precsim" },
            { "command": "\\triangleq" },
            { "command": "\\Coloneqq" },
            { "command": "\\gtreqqless" },
            { "command": "\\propto" },
            { "command": "\\trianglerighteq" },
            { "command": "\\colonsim" },
            { "command": "\\gtrless" },
            { "command": "\\risingdotseq" },
            { "command": "\\varpropto" },
            { "command": "\\Colonsim" },
            { "command": "\\gtrsim" },
            { "command": "\\shortmid" },
            { "command": "\\vartriangle" },
            { "command": "\\cong" },
            { "command": "\\imageof" },
            { "command": "\\shortparallel" },
            { "command": "\\vartriangleleft" },
            { "command": "\\curlyeqprec" },
            { "command": "\\in" },
            { "command": "\\sim" },
            { "command": "\\vartriangleright" },
            { "command": "\\curlyeqsucc" },
            { "command": "\\Join" },
            { "command": "\\simcolon" },
            { "command": "\\vcentcolon" },
            { "command": "\\dashv" },
            { "command": "\le" },
            { "command": "\\simcoloncolon" },
            { "command": "\\vdash" },
            { "command": "\\dblcolon" },
            { "command": "\\leq" },
            { "command": "\\simeq" },
            { "command": "\\vDash" },
            // { "command": "\\doteq" },
            // { "command": "\\leqq" },
            // { "command": "\\smallfrown" },
            // { "command": "\\Vdash" },
            // { "command": "\\Doteq" },
            // { "command": "\\leqslant" },
            // { "command": "\\smallsmile" },
            // { "command": "\\Vvdash" }
        ],
        negRelations: [
            { "command": "\\gnapprox" },
            { "command": "\\ngeqslant" },
            { "command": "\\nsubseteq" },
            { "command": "\\precneqq" },
            { "command": "\\gneq" },
            { "command": "\\ngtr" },
            { "command": "\\nsubseteqq" },
            { "command": "\\precnsim" },
            { "command": "\\gneqq" },
            { "command": "\\nleq" },
            { "command": "\\nsucc" },
            { "command": "\\subsetneq" },
            { "command": "\\gnsim" },
            { "command": "\\nleqq" },
            { "command": "\\nsucceq" },
            { "command": "\\subsetneqq" },
            { "command": "\\gvertneqq" },
            { "command": "\\nleqslant" },
            { "command": "\\nsupseteq" },
            { "command": "\\succnapprox" },
            { "command": "\\lnapprox" },
            { "command": "\\nless" },
            { "command": "\\nsupseteqq" },
            { "command": "\\succneqq" },
            { "command": "\\lneq" },
            { "command": "\\nmid" },
            { "command": "\\ntriangleleft" },
            { "command": "\\succnsim" },
            { "command": "\\lneqq" },
            { "command": "\\notin" },
            { "command": "\\ntrianglelefteq" },
            { "command": "\\supsetneq" },
            { "command": "\\lnsim" },
            { "command": "\\nparallel" },
            { "command": "\\ntrianglelefteq" },
            { "command": "\\supsetneqq" },
            { "command": "\\lvertneqq" },
            { "command": "\\ncong" },
            { "command": "\\nprec" },
            { "command": "\\nvdash" },
            { "command": "\\varsubsetneq" },
            { "command": "\\nshortmid" },
            { "command": "\\ntriangleright" },
            { "command": "\\supsetneqq" },
            { "command": "\\lnsim" },
            { "command": "\\nshortparallel" },
            { "command": "\\ntrianglerighteq" },
            { "command": "\\varsupsetneq" },
            { "command": "\\ncong" },
            { "command": "\\npreceq" },
            { "command": "\\nvDash" },
            { "command": "\\varsupsetneqq" },
            { "command": "\\ngeq" },
            { "command": "\\nshortparallel" },
            { "command": "\\nVDash" },
            { "command": "\\varsubsetneq" },
            { "command": "\\ne" },
            { "command": "\\npreceq" },
            { "command": "\\nvDash" },
            { "command": "\\varsupsetneqq" },
            { "command": "\\ngeqq" },
            { "command": "\\nsim" },
            { "command": "\\precnapprox" }
        ],
        arrows: [
            { "command": "\\circlearrowleft" },
            { "command": "\\leftharpoonup" },
            { "command": "\\rArr" },
            { "command": "\\circlearrowright" },
            { "command": "\\leftleftarrows" },
            { "command": "\\rarr" },
            { "command": "\\curvearrowleft" },
            { "command": "\\leftrightarrow" },
            { "command": "\\restriction" },
            { "command": "\\curvearrowright" },
            { "command": "\\Leftrightarrow" },
            { "command": "\\rightarrow" },
            { "command": "\\Darr" },
            { "command": "\\leftrightarrows" },
            { "command": "\\Rightarrow" },
            { "command": "\\dArr" },
            { "command": "\\leftrightharpoons" },
            { "command": "\\rightarrowtail" },
            { "command": "\\darr" },
            { "command": "\\leftrightsquigarrow" },
            { "command": "\\rightharpoondown" },
            { "command": "\\dashleftarrow" },
            { "command": "\\Lleftarrow" },
            { "command": "\\rightharpoonup" },
            { "command": "\\dashrightarrow" },
            { "command": "\\longleftarrow" },
            { "command": "\\rightleftarrows" },
            { "command": "\\downarrow" },
            { "command": "\\Longleftarrow" },
            { "command": "\\rightleftharpoons" },
            { "command": "\\Downarrow" },
            { "command": "\\longleftrightarrow" },
            { "command": "\\rightrightarrows" },
            { "command": "\\downdownarrows" },
            { "command": "\\Longleftrightarrow" },
            { "command": "\\rightsquigarrow" },
            { "command": "\\downharpoonleft" },
            { "command": "\\longmapsto" },
            { "command": "\\Rrightarrow" },
            { "command": "\\downharpoonright" },
            { "command": "\\longrightarrow" },
            { "command": "\\Rsh" },
            { "command": "\\gets" },
            { "command": "\\Longrightarrow" },
            { "command": "\\searrow" },
            { "command": "\\Harr" },
            { "command": "\\looparrowleft" },
            { "command": "\\swarrow" },
            { "command": "\\hArr" },
            { "command": "\\looparrowright" },
            { "command": "\\to" },
            { "command": "\\harr" },
            { "command": "\\Lrarr" },
            { "command": "\\twoheadleftarrow" },
            { "command": "\\hookleftarrow" },
            { "command": "\\lrArr" },
            { "command": "\\twoheadrightarrow" },
            { "command": "\\hookrightarrow" },
            { "command": "\\lrarr" },
            { "command": "\\Uarr" },
            { "command": "\\iff" },
            { "command": "\\Lsh" },
            { "command": "\\uArr" },
            { "command": "\\impliedby" },
            { "command": "\\mapsto" },
            { "command": "\\uarr" },
            { "command": "\\implies" },
            { "command": "\\nearrow" },
            { "command": "\\uparrow" },
            { "command": "\\Larr" },
            { "command": "\\nleftarrow" },
            { "command": "\\Uparrow" },
            { "command": "\\lArr" },
            { "command": "\\nLeftarrow" },
            { "command": "\\updownarrow" },
            { "command": "\\larr" },
            { "command": "\\nleftrightarrow" },
            { "command": "\\Updownarrow" },
            { "command": "\\leadsto" },
            { "command": "\\nLeftrightarrow" },
            { "command": "\\upharpoonleft" },
            { "command": "\\leftarrow" },
            { "command": "\\nrightarrow" },
            { "command": "\\upharpoonright" },
            { "command": "\\Leftarrow" },
            { "command": "\\nRightarrow" },
            { "command": "\\upuparrows" },
            { "command": "\\leftarrowtail" },
            { "command": "\\nwarrow" },
            { "command": "\\leftharpoondown" },
            { "command": "\\Rarr" }
        ],
        exArrows: [
            { "command": "\\xleftarrow{abc}" },
            { "command": "\\xrightarrow[under]{over}" },
            { "command": "\\xLeftarrow{abc}" },
            { "command": "\\xRightarrow{abc}" },
            { "command": "\\xleftrightarrow{abc}" },
            { "command": "\\xLeftrightarrow{abc}" },
            { "command": "\\xhookleftarrow{abc}" },
            { "command": "\\xhookrightarrow{abc}" },
            { "command": "\\xtwoheadleftarrow{abc}" },
            { "command": "\\xtwoheadrightarrow{abc}" },
            { "command": "\\xleftharpoonup{abc}" },
            { "command": "\\xrightharpoonup{abc}" },
            { "command": "\\xleftharpoondown{abc}" },
            { "command": "\\xrightharpoondown{abc}" },
            { "command": "\\xleftrightharpoons{abc}" },
            { "command": "\\xrightleftharpoons{abc}" },
            { "command": "\\xtofrom{abc}" },
            { "command": "\\xmapsto{abc}" },
            { "command": "\\xlongequal{abc}" }
        ]
    };

    // Generate dropdown menu dynamically
    // function generateDropdownMenu(commands, dropdownId) {
    //     var dropdownMenu = document.getElementById(dropdownId);

    //     commands.forEach(function (command) {
    //         var listItem = document.createElement("li");
    //         var link = document.createElement("a");
    //         link.href = "#";
    //         link.className = "dropdown-item";

    //         // Create a span to render the KaTeX symbol
    //         var katexSpan = document.createElement("span");
    //         katexSpan.innerHTML = katex.renderToString(command.command);

    //         // Attach the onClick event to insert the symbol into the live preview
    //         link.addEventListener("click", function () {
    //             insertText(command.command);
    //         });

    //         // Append the KaTeX span to the link
    //         link.appendChild(katexSpan);

    //         listItem.appendChild(link);
    //         dropdownMenu.appendChild(listItem);
    //     });
    // }

    // Generate dropdown menu dynamically
    function generateDropdownMenu(commands, dropdownId) {
        var dropdownMenu = document.getElementById(dropdownId);
        var symbolsPerColumn = 10;
        var totalSymbols = commands.length;
        var columnsCount = Math.ceil(totalSymbols / symbolsPerColumn);
        var colMdValue = "col-md-" + Math.floor(12 / columnsCount);
        var currentColumn = null;

        commands.forEach(function (command, index) {
            // Create a new column div for every symbolsPerColumn symbols
            if (index % symbolsPerColumn === 0) {
                currentColumn = document.createElement("div");
                currentColumn.className = colMdValue;
                dropdownMenu.appendChild(currentColumn);
            }

            var listItem = document.createElement("li");
            var link = document.createElement("a");
            link.href = "#";
            link.className = "dropdown-item";

            // Create a span to render the KaTeX symbol
            var katexSpan = document.createElement("span");
            katexSpan.innerHTML = katex.renderToString(command.command);

            // Attach the onClick event to insert the symbol into the live preview
            link.addEventListener("click", function () {
                insertText(command.command);
            });

            // Append the KaTeX span to the link
            link.appendChild(katexSpan);

            listItem.appendChild(link);
            currentColumn.appendChild(listItem);
        });
    }


    // Generate dropdown menus for each category on DOM load
    generateDropdownMenu(latexFunctions.delimiters, "delimitersDropdown");
    generateDropdownMenu(latexFunctions.environments, "envDropdown");
    generateDropdownMenu(latexFunctions.accents, "accentsDropdown");
    generateDropdownMenu(latexFunctions.logicAndSetTheory, "logicDropdown");
    generateDropdownMenu(latexFunctions.bigOperators, "bigDropdown");
    generateDropdownMenu(latexFunctions.binaryOperators, "binDropdown");
    generateDropdownMenu(latexFunctions.fractionsAndBinomials, "fracDropdown");
    generateDropdownMenu(latexFunctions.mathOperators, "mathsDropdown");
    generateDropdownMenu(latexFunctions.lettersUnicode, "lettersDropdown");
    generateDropdownMenu(latexFunctions.relations, "relationsDropdown");
    generateDropdownMenu(latexFunctions.negRelations, "negRelationsDropdown");
    generateDropdownMenu(latexFunctions.arrows, "arrowsDropdown");
    generateDropdownMenu(latexFunctions.exArrows, "exArrowsDropdown");

    // Home Animation
    var pathEls = document.querySelectorAll('path');
    for (var i = 0; i < pathEls.length; i++) {
        var pathEl = pathEls[i];
        var offset = anime.setDashoffset(pathEl);
        pathEl.setAttribute('stroke-dashoffset', offset);
        anime({
            targets: pathEl,
            strokeDashoffset: [offset, 0],
            duration: anime.random(1000, 3000),
            delay: anime.random(0, 2000),
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine',
            autoplay: true
        });
    }


    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml6 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: true })
        .add({
            targets: '.ml6 .letter',
            translateY: ["1.1em", 0],
            translateZ: 0,
            duration: 750,
            delay: (el, i) => 50 * i
        }).add({
            targets: '.ml6',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });


});
