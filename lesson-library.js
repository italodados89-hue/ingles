(function buildEnglishMomentumLessonLibrary() {
  const program = window.ENGLISH_MOMENTUM_PROGRAM;
  if (!program) return;

  const module = (name, rule, use, patterns, examples, pitfall, mistakes, practice, frames) => ({
    name, rule, use, patterns, examples, pitfall, mistakes, practice, frames,
  });

  const grammarModules = {
    be: module(
      "To be, pronomes e ordem da frase",
      "Em frases afirmativas, use sujeito + am/is/are + complemento. Na negativa, acrescente not. Na pergunta, coloque am/is/are antes do sujeito.",
      "Use to be para identidade, função, estado, localização e descrição — não para ações de rotina.",
      [
        ["Afirmativa", "I am / You are / He is + complemento", "I am responsible for reliability contracts."],
        ["Negativa", "Sujeito + am/is/are not", "The sensors are not online."],
        ["Pergunta", "Am/Is/Are + sujeito...?", "Is the mechanical seal available?"],
      ],
      ["I am a reliability manager.", "She is responsible for the service contract.", "The pumps are in the maintenance area.", "Are the sensors ready for inspection?"],
      "Português permite omitir o sujeito; inglês normalmente exige I, you, he, she, it, we ou they. Diga “I am tired”, não “am tired”.",
      [["I have 42 years.", "I am 42 years old.", "Idade usa to be."], ["Is installed the sensor?", "Is the sensor installed?", "O sujeito vem logo depois do verbo na pergunta."]],
      [["Complete: I ___ responsible for contracts.", "am"], ["Complete: The seal ___ not damaged.", "is"], ["Transforme em pergunta: The sensors are online.", "Are the sensors online?"], ["Corrija: We is ready for the review.", "We are ready for the review."], ["Traduza: Eu estou na área de manutenção.", "I am in the maintenance area."], ["Complete com pronome: The pump is new. ___ is under warranty.", "It"]],
      ["I am responsible for...", "My main objective is...", "The current condition is...", "Are you available to...?"],
    ),
    presentSimple: module(
      "Present simple: rotinas, fatos e responsabilidades",
      "Use o verbo na forma base com I/you/we/they. Com he/she/it, acrescente -s ou -es. Use do/does nas negativas e perguntas.",
      "Use para rotinas, processos recorrentes, fatos e responsabilidades permanentes. Não use para uma ação acontecendo exatamente agora.",
      [["Afirmativa", "I/We inspect · He/She inspects", "The team reviews vibration data every Monday."], ["Negativa", "do/does not + verbo base", "The system does not store raw signals."], ["Pergunta", "Do/Does + sujeito + verbo base?", "Does the contract include monitoring?"]],
      ["I manage reliability projects.", "The technician checks the seal every shift.", "We do not replace parts without evidence.", "Does this sensor measure pressure?"],
      "Depois de does/doesn't, o verbo volta à forma base: “Does it work?”, nunca “Does it works?”.",
      [["He check the pump every day.", "He checks the pump every day.", "Terceira pessoa recebe -s."], ["The team don't review the data.", "The team doesn't review the data.", "Team é singular neste contexto."]],
      [["Complete: She ___ (monitor) the contract weekly.", "monitors"], ["Complete: We ___ not ___ (replace) seals without inspection.", "do not replace"], ["Pergunta: ___ the sensor ___ (measure) vibration?", "Does the sensor measure vibration?"], ["Corrija: The manager discuss the KPI every Friday.", "The manager discusses the KPI every Friday."], ["Transforme em negativa: I review the report daily.", "I do not review the report daily."], ["Traduza: Nossa equipe reduz paradas não planejadas.", "Our team reduces unplanned downtime."]],
      ["I usually start by...", "My role involves...", "The process starts when...", "We do not proceed until..."],
    ),
    questions: module(
      "Perguntas com do/does/did e question words",
      "Em perguntas no presente use question word + do/does + sujeito + verbo base. No passado, use did para todas as pessoas.",
      "Use perguntas abertas para descobrir contexto (what, why, how, when, where, who) e perguntas fechadas para confirmar.",
      [["Presente", "What + do/does + sujeito + verbo?", "What does the customer expect?"], ["Passado", "Why + did + sujeito + verbo?", "Why did the seal fail?"], ["Confirmação", "Do/Does/Did + sujeito + verbo?", "Did the alarm activate?"]],
      ["How do you track equipment reliability?", "What does this indicator mean?", "When did the vibration increase?", "Why did the team stop the pump?"],
      "Não mantenha o passado ou o -s no verbo principal depois de did/does: “Why did it fail?”, não “Why did it failed?”.",
      [["What you need?", "What do you need?", "Falta o auxiliar do."], ["Why did the pump stopped?", "Why did the pump stop?", "Did já marca o passado."]],
      [["Ordene: does / what / measure / the sensor?", "What does the sensor measure?"], ["Complete: Why ___ the seal fail yesterday?", "did"], ["Transforme: The customer needs a report. (pergunta)", "What does the customer need?"], ["Corrija: When the alarm activated?", "When did the alarm activate?"], ["Crie uma pergunta com how often sobre inspeções.", "How often do you inspect the equipment?"], ["Traduza: Quem aprovou o contrato?", "Who approved the contract?"]],
      ["What exactly do you mean by...?", "How often does this happen?", "When did you first notice...?", "Could you tell me why...?"],
    ),
    ability: module(
      "Have, can e can't",
      "Use have/has para posse, recursos e experiência; can/can't + verbo base para capacidade, possibilidade e permissão.",
      "Can não recebe -s e não usa to antes do verbo. Para responsabilidades, combine have com nomes e can com ações.",
      [["Recursos", "I/We have · He/She has", "We have three vibration sensors."], ["Capacidade", "can + verbo base", "I can explain the failure mode."], ["Limite", "cannot/can't + verbo base", "The system can't detect contamination."]],
      ["I have experience in mechanical seals.", "She has access to the dashboard.", "We can monitor pressure remotely.", "The current sensor cannot measure flow."],
      "Não diga “I have knowledge to do”; prefira “I know how to do” ou “I have experience in doing”.",
      [["He can explains the result.", "He can explain the result.", "Depois de can use a forma base."], ["She have two contracts.", "She has two contracts.", "He/she/it usa has."]],
      [["Complete: We ___ experience in reliability engineering.", "have"], ["Complete: The device ___ detect leakage.", "can"], ["Corrija: He can to lead the review.", "He can lead the review."], ["Negativa: The sensor can measure temperature.", "The sensor cannot/can't measure temperature."], ["Traduza: Ela tem habilidade para negociar contratos.", "She has the ability to negotiate contracts."], ["Complete: The team ___ access to the maintenance history.", "has"]],
      ["I have experience in...", "I can support the team by...", "We cannot confirm this until...", "The system has the ability to..."],
    ),
    frequency: module(
      "Advérbios de frequência",
      "Coloque always, usually, often, sometimes, rarely e never antes do verbo principal, mas depois de to be.",
      "Use para descrever hábitos e frequência. Para precisão, combine com every day, once a week ou twice a month.",
      [["Verbo comum", "sujeito + advérbio + verbo", "We usually review the alarms at 8 a.m."], ["To be", "sujeito + be + advérbio", "The readings are often unstable."], ["Frequência exata", "once/twice/three times + período", "We inspect the seal twice a month."]],
      ["I always confirm the action owner.", "The pump is sometimes noisy at startup.", "We rarely replace a seal without evidence.", "How often do you calibrate the sensor?"],
      "Never já é negativo; não use “don't never”. Diga “We never skip the inspection”.",
      [["I review usually the dashboard.", "I usually review the dashboard.", "O advérbio vem antes do verbo principal."], ["We don't never ignore alarms.", "We never ignore alarms.", "Evite dupla negação."]],
      [["Ordene: usually / I / at 8 / start work.", "I usually start work at 8."], ["Complete: The readings are ___ unstable. (às vezes)", "sometimes"], ["Corrija: She checks always the deadline.", "She always checks the deadline."], ["Traduza: Nós raramente adiamos a inspeção.", "We rarely postpone the inspection."], ["Escreva uma frase com twice a week.", "Model: We review vibration trends twice a week."], ["Pergunte sobre frequência de manutenção.", "How often do you perform maintenance?"]],
      ["I always make sure that...", "We usually... before...", "This problem rarely occurs when...", "How often do you...?"],
    ),
    connectors: module(
      "Conectores: causa, contraste e resultado",
      "Use because + oração para causa; although/even though + oração para contraste; however para iniciar uma nova frase; therefore para resultado formal.",
      "Conectores mostram a lógica entre ideias. Escolha um conector pelo significado, não apenas para deixar a frase longa.",
      [["Causa", "resultado + because + causa", "We stopped the pump because the seal was leaking."], ["Contraste", "Although + ideia A, ideia B", "Although the reading was high, the pump remained stable."], ["Resultado", "Frase. Therefore, frase.", "The risk is high. Therefore, we recommend inspection."]],
      ["The contract is valuable because it reduces downtime.", "Although the sensor is old, its readings are consistent.", "The cost is higher; however, the risk is lower.", "The evidence is incomplete. Therefore, we need another test."],
      "Because of vem antes de um nome: “because of contamination”. Because vem antes de uma oração: “because the oil was contaminated”.",
      [["Because the delay, we changed the plan.", "Because of the delay, we changed the plan.", "Depois de because of use um nome."], ["Although the risk is high. We will proceed.", "Although the risk is high, we will proceed.", "Although conecta as duas orações."]],
      [["Una com because: We stopped the unit. The pressure was low.", "We stopped the unit because the pressure was low."], ["Complete: ___ the cost is higher, the option is safer.", "Although/Even though"], ["Reescreva com however: The test passed. The noise continued.", "The test passed. However, the noise continued."], ["Escolha: The evidence is strong. (Therefore/Because), we recommend replacement.", "Therefore"], ["Corrija: Because of the seal failed, production stopped.", "Because the seal failed, production stopped."], ["Traduza: A vibração caiu; portanto, mantivemos o plano.", "The vibration decreased; therefore, we kept the plan."]],
      ["This matters because...", "Although we have made progress,...", "However, the main risk is...", "Therefore, I recommend..."],
    ),
    pastSimple: module(
      "Past simple: ações concluídas",
      "Use verbo + -ed nos regulares e a forma própria nos irregulares. Na negativa e pergunta, use did + verbo base.",
      "Use para eventos concluídos em um tempo terminado: yesterday, last week, in 2025, two hours ago.",
      [["Afirmativa", "sujeito + passado", "The team inspected the seal yesterday."], ["Negativa", "did not + verbo base", "We did not find external damage."], ["Pergunta", "Did + sujeito + verbo base?", "Did the alarm activate?"]],
      ["We visited the customer last Tuesday.", "The vibration rose after startup.", "The technician found contamination.", "Did the team replace the bearing?"],
      "Depois de did/didn't, use a forma base: “did not find”, não “did not found”.",
      [["We didn't detected a leak.", "We didn't detect a leak.", "Did já marca o passado."], ["The team stoped the pump.", "The team stopped the pump.", "Verbos CVC dobram a consoante final."]],
      [["Complete: We ___ (inspect) the equipment yesterday.", "inspected"], ["Complete: The alarm ___ (go) off at 10:30.", "went"], ["Negativa: The team found a leak.", "The team did not find a leak."], ["Pergunta: The engineer called the customer.", "Did the engineer call the customer?"], ["Corrija: Did you reviewed the report?", "Did you review the report?"], ["Traduza: Nós substituímos o selo na semana passada.", "We replaced the seal last week."]],
      ["Yesterday, I...", "The issue started when...", "We found that...", "As a result, we..."],
    ),
    pastContinuous: module(
      "Past continuous: ação em andamento no passado",
      "Use was/were + verbo-ing. Combine com past simple quando uma ação em andamento foi interrompida por um evento curto.",
      "Use para dar contexto, descrever uma ação em progresso ou duas ações simultâneas no passado.",
      [["Em andamento", "was/were + verbo-ing", "The pump was running at full load."], ["Interrupção", "was/were ... when + past simple", "We were reviewing the data when the alarm sounded."], ["Simultâneas", "while + past continuous", "While I was calling the customer, the team was testing the seal."]],
      ["The pressure was rising before the trip.", "They were inspecting the coupling when the unit stopped.", "I was writing the report while the team was collecting samples.", "What were you doing when the alarm activated?"],
      "Use was com I/he/she/it e were com you/we/they. Não diga “was happened”; happened é uma ação curta no past simple.",
      [["The failure was happened at noon.", "The failure happened at noon.", "Happen normalmente usa past simple."], ["We was checking the sensor.", "We were checking the sensor.", "We usa were."]],
      [["Complete: The pump ___ (run) when the pressure dropped.", "was running"], ["Complete: We ___ (review) the trend at 3 p.m.", "were reviewing"], ["Una com when: I inspected the seal. The alarm sounded.", "I was inspecting the seal when the alarm sounded."], ["Corrija: They was monitoring the unit.", "They were monitoring the unit."], ["Escolha: While/When the engineer was speaking, I took notes.", "While"], ["Traduza: O que estava acontecendo quando a bomba parou?", "What was happening when the pump stopped?"]],
      ["At that moment, ... was/were ...", "We were ... when...", "While the team was..., I was...", "The situation changed when..."],
    ),
    presentPerfect: module(
      "Present perfect: passado conectado ao presente",
      "Use have/has + particípio. Use para experiência sem tempo definido, resultado atual e situação iniciada no passado que continua agora.",
      "Compare: past simple responde quando; present perfect enfatiza experiência, duração ou resultado até agora.",
      [["Experiência", "have/has + particípio", "We have implemented three monitoring projects."], ["Duração", "have/has + particípio + for/since", "I have worked here for five years."], ["Resultado", "have/has already/just + particípio", "The team has already updated the contract."]],
      ["I have worked with mechanical seals since 2020.", "We have reduced downtime by 12%.", "Has the customer approved the proposal yet?", "The team has not completed the inspection yet."],
      "Não use present perfect com tempo passado terminado: diga “We visited the plant yesterday”, não “We have visited ... yesterday”.",
      [["I have met the customer last Monday.", "I met the customer last Monday.", "Last Monday exige past simple."], ["She has went to the site.", "She has gone to the site.", "Use o particípio gone."]],
      [["Complete: We ___ (reduce) downtime since January.", "have reduced"], ["Complete: She ___ already ___ (send) the report.", "has already sent"], ["Escolha: I worked/have worked here since 2022.", "have worked"], ["Corrija: We have installed the sensor yesterday.", "We installed the sensor yesterday."], ["Pergunta com yet: the customer / approve / the scope", "Has the customer approved the scope yet?"], ["Traduza: Eu já participei de três revisões de confiabilidade.", "I have already participated in three reliability reviews."]],
      ["So far, we have...", "I have worked with... since...", "We have already..., but we have not... yet.", "This experience has helped me..."],
    ),
    goingTo: module(
      "Going to: planos e evidência visível",
      "Use am/is/are going to + verbo base para planos já decididos e previsões baseadas em evidência visível.",
      "Use quando a decisão existe antes do momento da fala. Para agenda confirmada, o present continuous também é natural.",
      [["Plano", "be going to + verbo", "We are going to inspect the pump on Friday."], ["Previsão com evidência", "be going to + verbo", "The pressure is falling; the unit is going to trip."], ["Pergunta", "Be + sujeito + going to + verbo?", "Are you going to update the customer?"]],
      ["I am going to review the contract tomorrow.", "The team is going to install two sensors.", "We are not going to replace the seal yet.", "When are you going to present the plan?"],
      "Não omita to be: diga “We are going to test”, não “We going to test”.",
      [["I going to call the customer.", "I am going to call the customer.", "Going to exige am/is/are."], ["We are going test the pump.", "We are going to test the pump.", "Falta to antes do verbo."]],
      [["Complete: We ___ going to inspect the seal.", "are"], ["Negativa: She is going to approve the plan.", "She is not going to approve the plan."], ["Pergunta: they / install / the sensor", "Are they going to install the sensor?"], ["Corrija: The team going to review the risk.", "The team is going to review the risk."], ["Traduza: Vou visitar o cliente na próxima semana.", "I am going to visit the customer next week."], ["Escreva uma previsão com evidência.", "Model: The vibration is increasing; the bearing is going to fail."]],
      ["We are going to...", "The first step is going to be...", "Based on the current evidence, ... is going to...", "Are we going to...?"],
    ),
    will: module(
      "Will: decisões, promessas e previsões",
      "Use will + verbo base para decisão tomada agora, promessa, oferta e previsão/opinião. A negativa é will not/won't.",
      "Diferencie: going to = plano anterior; will = decisão imediata ou previsão menos baseada em evidência direta.",
      [["Decisão", "will + verbo", "I will send the report after the meeting."], ["Previsão", "will probably + verbo", "Downtime will probably decrease."], ["Promessa", "will + verbo", "We will keep the customer informed."]],
      ["I will check the sensor now.", "The project will probably finish on time.", "We won't change the scope without approval.", "Will you confirm the deadline?"],
      "Depois de will, use a forma base: “will be”, “will go”, “will review”; nunca “will is” ou “will went”.",
      [["The result will is better.", "The result will be better.", "Depois de will use be."], ["We will to send the proposal.", "We will send the proposal.", "Will não usa to."]],
      [["Complete: I ___ call the customer now.", "will"], ["Complete: The risk will probably ___ (decrease).", "decrease"], ["Negativa: We will change the price.", "We will not/won't change the price."], ["Corrija: The team will finished tomorrow.", "The team will finish tomorrow."], ["Traduza: Vou confirmar o prazo por escrito.", "I will confirm the deadline in writing."], ["Escolha: Look at the pressure! It will/is going to trip.", "is going to trip"]],
      ["I will make sure that...", "We will probably...", "If anything changes, I will...", "Will you please confirm...?"],
    ),
    sequence: module(
      "Sequência e narrativa clara",
      "Use first, then, next, after that e finally para ordenar; use before/after + nome ou oração; use when/while para conectar eventos.",
      "Uma narrativa profissional precisa de contexto, sequência, resultado e aprendizado — não apenas uma lista de fatos.",
      [["Ordem", "First... Then... Finally...", "First, we isolated the unit. Then, we inspected the seal."], ["Tempo", "before/after + nome ou oração", "After we reviewed the evidence, we restarted the pump."], ["Interrupção", "was/were -ing when + passado", "We were testing the sensor when the signal dropped."]],
      ["First, the operator reported unusual noise.", "Next, we compared the vibration trend.", "After that, the team inspected the coupling.", "Finally, we documented the corrective action."],
      "After pode ser seguido por nome ou oração: “after the test” / “after we tested”. Evite “after to test”.",
      [["After to inspect, we restarted.", "After inspecting / After we inspected, we restarted.", "After não usa infinitivo com to."], ["First we checked. Finally we found. Then we stopped.", "First we checked. Then we found the issue. Finally, we stopped the unit.", "Mantenha a ordem lógica."]],
      [["Ordene: finally / first / then.", "First → then → finally"], ["Complete: ___, we isolated the equipment. Next, we inspected it.", "First"], ["Una: We reviewed the data. We made a decision. (after)", "After we reviewed the data, we made a decision."], ["Corrija: Before to restart, check the seal.", "Before restarting / Before you restart, check the seal."], ["Traduza: Enquanto monitorávamos a pressão, a vibração aumentou.", "While we were monitoring the pressure, the vibration increased."], ["Escreva a etapa final de uma análise.", "Model: Finally, we documented the findings and assigned the actions."]],
      ["Let me start with the context.", "First... Next... After that...", "The turning point came when...", "Finally, the key lesson was..."],
    ),
    polite: module(
      "Instruções e pedidos profissionais",
      "Use verbo base para instruções diretas. Para suavizar, use please, could you, would you mind + -ing ou let's.",
      "Escolha o nível de formalidade: imperativo para procedimento; pedido modal para colegas/clientes; let's para ação conjunta.",
      [["Procedimento", "verbo base", "Open the dashboard and select the asset."], ["Pedido", "Could you + verbo?", "Could you confirm the serial number?"], ["Ação conjunta", "Let's + verbo", "Let's review the risk before we decide."]],
      ["Please check the latest reading.", "Could you share the maintenance history?", "Would you mind repeating the question?", "Let's confirm the next steps."],
      "Would you mind é seguido de verbo-ing: “Would you mind sending...?”, não “to send”.",
      [["Could you to send the file?", "Could you send the file?", "Depois de could use verbo base."], ["Would you mind to repeat?", "Would you mind repeating?", "Mind pede -ing."]],
      [["Torne educado: Send the report.", "Could you please send the report?"], ["Complete: Would you mind ___ (confirm) the value?", "confirming"], ["Complete: Let's ___ (review) the evidence.", "review"], ["Corrija: Please to check the sensor.", "Please check the sensor."], ["Traduza: Você poderia explicar isso novamente?", "Could you explain that again?"], ["Dê uma instrução de segurança.", "Model: Isolate the equipment before you start the inspection."]],
      ["Could you please...?", "Would you mind...?", "Let's make sure that...", "Before you begin, please..."],
    ),
    indirectQuestions: module(
      "Perguntas indiretas e esclarecimento",
      "Comece com Could you tell me..., Do you know... ou I'd like to understand... e use ordem afirmativa depois da expressão inicial.",
      "Perguntas indiretas soam mais diplomáticas e são úteis em reuniões, diagnósticos e conversas com clientes.",
      [["Direta", "Question word + auxiliar + sujeito", "Why did the seal fail?"], ["Indireta", "Could you tell me + question word + sujeito + verbo", "Could you tell me why the seal failed?"], ["Sim/não", "Do you know if/whether + sujeito + verbo", "Do you know whether the sensor is calibrated?"]],
      ["Could you clarify what this value represents?", "Do you know when the inspection was completed?", "I'd like to understand why the scope changed.", "Could you tell me whether the customer approved the proposal?"],
      "Na parte indireta, não inverta sujeito e verbo: “Do you know where the report is?”, não “where is the report?”.",
      [["Could you tell me where is the sensor?", "Could you tell me where the sensor is?", "A parte indireta usa ordem afirmativa."], ["Do you know what does it mean?", "Do you know what it means?", "Retire o auxiliar na oração indireta."]],
      [["Transforme: Why did the alarm activate?", "Could you tell me why the alarm activated?"], ["Transforme: Is the sensor calibrated?", "Do you know whether the sensor is calibrated?"], ["Corrija: I'd like to know when will the project start.", "I'd like to know when the project will start."], ["Complete: Could you clarify what this number ___ (mean)?", "means"], ["Traduza: Você sabe onde o relatório está?", "Do you know where the report is?"], ["Torne mais diplomática: What do you want?", "Could you tell me what you need?"]],
      ["Could you clarify what...?", "Do you know whether...?", "I'd like to understand why...", "If I understood correctly, ... Is that right?"],
    ),
    hedging: module(
      "Hedging: falar com o nível certo de certeza",
      "Use may/might/could para possibilidade; appears/seems to para evidência moderada; suggests/indicates para interpretação; must para dedução forte.",
      "Em análise técnica e executiva, ajuste a força da afirmação à qualidade da evidência. Isso aumenta precisão e credibilidade.",
      [["Baixa confiança", "may/might/could + verbo", "The pattern might indicate misalignment."], ["Média", "appears/seems to + verbo", "The leakage appears to be intermittent."], ["Alta", "evidence strongly suggests + nome", "The evidence strongly suggests seal-face damage."]],
      ["The temperature increase may be seasonal.", "The signal could indicate a loose connection.", "The trend appears to be stabilizing.", "The evidence strongly suggests contamination."],
      "May/might/could vêm antes do verbo base: “may indicate”, não “may indicates”. Evite dizer definitely quando há apenas uma hipótese.",
      [["The data may indicates a failure.", "The data may indicate a failure.", "Modal + verbo base."], ["This is definitely the cause. (com evidência limitada)", "This may be a contributing cause.", "A força deve combinar com a evidência."]],
      [["Complete: The noise ___ indicate cavitation. (possibilidade)", "may/might/could"], ["Reescreva com cautela: The seal is damaged.", "The seal appears to be damaged."], ["Corrija: The trend might suggests instability.", "The trend might suggest instability."], ["Classifique: must / may / might (mais forte → mais fraco).", "must → may → might (em uso geral)"], ["Traduza: As evidências sugerem fortemente contaminação.", "The evidence strongly suggests contamination."], ["Dê três níveis de certeza para a mesma hipótese.", "Model: It might be misalignment. It appears to be misalignment. It must be misalignment."]],
      ["The evidence may indicate...", "At this stage, it appears that...", "A possible explanation is...", "We cannot confirm this until..."],
    ),
    obligation: module(
      "Should, must e have to",
      "Use should para recomendação; must para obrigação forte do falante/regra crítica; have to para obrigação externa ou necessidade prática.",
      "Na negativa, mustn't significa proibido; don't have to significa não é necessário. Eles não são equivalentes.",
      [["Recomendação", "should + verbo", "We should inspect the coupling."], ["Obrigação", "must + verbo", "You must isolate the equipment."], ["Necessidade externa", "have to + verbo", "We have to meet the contractual deadline."]],
      ["We should compare the vibration trend.", "The technician must wear the required PPE.", "The team has to document the change.", "You don't have to replace the seal yet."],
      "Mustn't = não pode; don't have to = não precisa. “You mustn't enter” é proibição, não opção.",
      [["We should to inspect the seal.", "We should inspect the seal.", "Modal + verbo base."], ["You don't have to touch this live panel.", "You mustn't touch this live panel.", "Segurança exige proibição."]],
      [["Escolha: We should/must submit the proposal by the legal deadline.", "must/have to"], ["Complete: You ___ wear safety glasses in this area.", "must/have to"], ["Negativa de não necessidade: We have to replace it now.", "We don't have to replace it now."], ["Corrija: The team must to record the readings.", "The team must record the readings."], ["Traduza: Devemos monitorar a pressão com mais frequência.", "We should monitor the pressure more frequently."], ["Explique a diferença: mustn't × don't have to.", "Mustn't = proibido; don't have to = não é necessário."]],
      ["We should consider...", "We must make sure that...", "The team has to... by...", "We don't have to..., but we should..."],
    ),
    quantifiers: module(
      "Quantificadores, contáveis e incontáveis",
      "Use many/few com contáveis; much/little com incontáveis; a lot of com ambos; some em afirmativas e any em perguntas/negativas.",
      "Trate equipment, information, advice, work e evidence como incontáveis em inglês.",
      [["Contável", "many/few + plural", "We have a few open actions."], ["Incontável", "much/little + singular", "We have little evidence."], ["Ambos", "a lot of + nome", "The project requires a lot of work."]],
      ["How many sensors do we need?", "How much downtime did we record?", "We have some useful information.", "There isn't enough evidence to decide."],
      "Não pluralize incontáveis: information, equipment, advice, evidence. Use “pieces of equipment/information” quando precisar contar.",
      [["We need more informations.", "We need more information.", "Information é incontável."], ["How much sensors?", "How many sensors?", "Sensors são contáveis."]],
      [["Complete: How ___ sensors are installed?", "many"], ["Complete: How ___ evidence do we have?", "much"], ["Corrija: The customer gave us two advices.", "The customer gave us two pieces of advice."], ["Escolha: We have few/little time.", "little"], ["Traduza: Não há equipamentos suficientes.", "There isn't enough equipment."], ["Complete: We need ___ additional resources. (alguns)", "some"]],
      ["We have enough... to...", "There is not enough...", "A significant amount of...", "Only a few... remain."],
    ),
    comparatives: module(
      "Comparativos e superlativos",
      "Use -er/more + than para comparar dois itens; the -est/the most para o extremo de um grupo; as...as para igualdade.",
      "Compare sempre pelo critério explícito: safer, more reliable, less expensive, easier to maintain.",
      [["Curto", "adjetivo-er + than", "Option A is safer than option B."], ["Longo", "more + adjetivo + than", "This sensor is more reliable than the old one."], ["Igualdade", "as + adjetivo + as", "The repair is as effective as the replacement."]],
      ["The new seal is more durable than the previous model.", "Option C has the lowest lifecycle cost.", "Monitoring is less disruptive than immediate replacement.", "This contract is twice as valuable as the old one."],
      "Não use dupla marca: more easier/more better. Use easier/better. Better e worse são irregulares.",
      [["This option is more cheaper.", "This option is cheaper.", "Não duplique o comparativo."], ["The sensor is more good.", "The sensor is better.", "Good → better."]],
      [["Complete: Option A is ___ (safe) than option B.", "safer"], ["Complete: This method is ___ (reliable) than the old one.", "more reliable"], ["Superlativo: low lifecycle cost", "the lowest lifecycle cost"], ["Corrija: This solution is more better.", "This solution is better."], ["Traduza: A inspeção é menos cara que a substituição.", "The inspection is less expensive than the replacement."], ["Use as...as: as duas opções são igualmente eficazes.", "Option A is as effective as option B."]],
      ["Compared with..., this option is...", "The main advantage is...", "It is less... but more...", "Overall, the best option is... because..."],
    ),
    trends: module(
      "Números e tendências sem ambiguidade",
      "Use rise/fall/increase/decrease como verbos; by para o tamanho da mudança; to para o valor final; from...to para os dois pontos.",
      "Combine tendência, intensidade, período, valor e implicação de negócio.",
      [["Mudança", "increase by + quantidade", "Availability increased by 4 percentage points."], ["Valor final", "increase to + valor", "Availability increased to 96%."], ["Intervalo", "from X to Y", "Downtime fell from 12 hours to 7 hours."]],
      ["Vibration increased gradually during the shift.", "Pressure dropped sharply to 2.1 bar.", "Maintenance cost remained stable at $40,000.", "The failure rate fell by 18%."],
      "By mostra quanto mudou; to mostra onde chegou. Em percentuais, deixe claro se fala em percent ou percentage points.",
      [["Revenue increased to 10%. (quer dizer mudança)", "Revenue increased by 10%.", "By indica o tamanho da mudança."], ["The KPI stayed steadily.", "The KPI remained stable.", "Stable é adjetivo; steadily descreve movimento."]],
      [["Complete: Availability rose ___ 92% ___ 96%.", "from; to"], ["Complete: Cost decreased ___ 8%.", "by"], ["Complete: Pressure fell ___ 2 bar.", "to"], ["Corrija: The indicator increased hardly.", "The indicator increased sharply/significantly."], ["Traduza: A vibração permaneceu estável durante três dias.", "Vibration remained stable for three days."], ["Descreva 50 → 65 e mudança de 15.", "It increased from 50 to 65, a rise of 15 units."]],
      ["The indicator increased from... to...", "This represents a change of...", "The main driver was...", "The business implication is..."],
    ),
    conditional1: module(
      "First conditional: condição real e consequência",
      "Use if + present simple, will/can/may + verbo base para condições futuras reais ou prováveis.",
      "Use para consequências, riscos, propostas e acordos. Unless significa if...not.",
      [["Condição", "If + presente, will + verbo", "If we approve the scope, we will start Monday."], ["Capacidade", "If + presente, can + verbo", "If the sensor is stable, we can restart the unit."], ["Unless", "Unless + afirmativa", "We will not proceed unless the risk is controlled."]],
      ["If vibration increases, we will stop the pump.", "If the customer approves the proposal, we can mobilize the team.", "Unless we receive the data, the review will be incomplete.", "We may extend the test if the result is inconclusive."],
      "Em condições reais comuns, não use will logo depois de if: “If it rains, we will stop”, não “If it will rain”.",
      [["If the pressure will rise, we will stop.", "If the pressure rises, we will stop.", "A oração com if usa presente."], ["Unless we don't act, the risk will grow.", "Unless we act, the risk will grow.", "Unless já contém a ideia negativa."]],
      [["Complete: If the customer ___ (approve), we will start.", "approves"], ["Complete: If vibration increases, we ___ stop the pump.", "will/may"], ["Reescreva com unless: We won't proceed if we don't receive approval.", "We won't proceed unless we receive approval."], ["Corrija: If we will reduce the scope, the price will fall.", "If we reduce the scope, the price will fall."], ["Traduza: Se monitorarmos a pressão, poderemos evitar a falha.", "If we monitor the pressure, we can avoid the failure."], ["Crie uma condição para prazo.", "Model: If we receive the parts by Thursday, we will finish on Friday."]],
      ["If we..., we will...", "We can... provided that...", "Unless..., we will not...", "The main risk is that if..., then..."],
    ),
    conditional2: module(
      "Second conditional e concessões negociadas",
      "Use if + past simple, would/could + verbo base para cenários hipotéticos. Use provided that/as long as para condições de acordo e unless para exceção negativa.",
      "É útil para explorar opções, limites de negociação e consequências sem afirmar que o cenário é real.",
      [["Hipótese", "If + passado, would + verbo", "If we reduced the scope, we would lower the price."], ["Capacidade", "If + passado, could + verbo", "If we had more data, we could refine the estimate."], ["Concessão", "provided that/as long as + presente", "We can agree, provided that the warranty is extended."]],
      ["If the deadline were flexible, we would add another test.", "We could reduce the fee if the volume increased.", "We will accept the term as long as the liability is capped.", "We cannot proceed unless both parties approve the change."],
      "Para conselho hipotético, use “If I were you...”. Na escrita formal, were é preferível com todas as pessoas em cenários irreais.",
      [["If we would have time, we would test more.", "If we had time, we would test more.", "Não use would na oração com if."], ["We agree unless you extend the warranty.", "We agree provided that you extend the warranty.", "Unless expressa exceção negativa, não condição positiva."]],
      [["Complete: If we ___ (have) more time, we would test again.", "had"], ["Complete: We could lower the price if the volume ___ (increase).", "increased"], ["Corrija: If I was you, I would clarify the clause.", "If I were you, I would clarify the clause."], ["Reescreva: We agree only if the warranty is extended.", "We agree provided that the warranty is extended."], ["Traduza: Se o prazo fosse flexível, poderíamos aceitar.", "If the deadline were flexible, we could accept."], ["Crie uma concessão com as long as.", "Model: We can include the service as long as the scope remains unchanged."]],
      ["If we were to..., we would need...", "We could agree provided that...", "As long as..., we can...", "That would be difficult unless..."],
    ),
    passive: module(
      "Voz passiva: foco no processo e resultado",
      "Use be no tempo necessário + particípio. O tempo está no verbo be: is reviewed, was replaced, has been approved, will be confirmed.",
      "Use quando o processo/resultado importa mais que o agente, ou quando o agente é óbvio/desconhecido. Use by apenas quando o agente acrescenta valor.",
      [["Presente", "am/is/are + particípio", "The data is reviewed every Friday."], ["Passado", "was/were + particípio", "The seal was replaced after the inspection."], ["Futuro", "will be + particípio", "The final terms will be confirmed in writing."]],
      ["The sensor is calibrated every six months.", "The root cause was confirmed by the laboratory.", "The corrective action has been completed.", "The contract will be renewed in November."],
      "Não confunda was + -ing (ação em progresso) com was + particípio (passiva): “was inspecting” × “was inspected”.",
      [["The seal was replace yesterday.", "The seal was replaced yesterday.", "A passiva exige particípio."], ["The data is review every week.", "The data is reviewed every week.", "Use o particípio reviewed."]],
      [["Passe para a passiva: The team reviews the data weekly.", "The data is reviewed weekly."], ["Passe para a passiva: The technician replaced the seal.", "The seal was replaced by the technician."], ["Complete: The report will ___ ___ tomorrow. (send)", "be sent"], ["Corrija: The sensor was calibrate last month.", "The sensor was calibrated last month."], ["Traduza: A causa raiz ainda não foi confirmada.", "The root cause has not been confirmed yet."], ["Escolha: The pump was monitoring/was monitored remotely.", "was monitored"]],
      ["The process is divided into...", "The data is collected by...", "The issue was detected when...", "The result will be confirmed after..."],
    ),
    reported: module(
      "Reported speech: relatar decisões e pedidos",
      "Use said + that; told + pessoa + that/to; asked + pessoa + to/if/question word. Ajuste pronomes, tempo e referência temporal quando necessário.",
      "Use para atas, follow-up, escalonamento e resumo de reuniões. Preserve quem disse o quê e qual ação foi pedida.",
      [["Informação", "said (that) + oração", "The manager said that the risk was acceptable."], ["Pessoa", "told + pessoa + oração/to", "She told us to revise the forecast."], ["Pergunta", "asked + if/question word", "The customer asked when the report would be ready."]],
      ["The engineer said that the reading was unreliable.", "The director told us to reduce the risk.", "The customer asked whether the scope included training.", "The minutes state that the action is due on Friday."],
      "Say não recebe pessoa diretamente: “said to us” ou “told us”, nunca “said us”.",
      [["She said me to wait.", "She told me to wait.", "Tell recebe pessoa."], ["He told that the risk was high.", "He said that the risk was high.", "Sem pessoa, use said."]],
      [["Relate: “The risk is high,” she said.", "She said that the risk was high."], ["Relate: “Update the forecast,” he told us.", "He told us to update the forecast."], ["Relate: “Is the sensor ready?” the customer asked.", "The customer asked whether the sensor was ready."], ["Corrija: The manager said us that the deadline changed.", "The manager told us that the deadline had changed."], ["Traduza: Ela pediu que confirmássemos o prazo.", "She asked us to confirm the deadline."], ["Relate: “When will the report be ready?”", "He/She asked when the report would be ready."]],
      ["The customer said that...", "The committee decided that...", "We were asked to...", "The agreed action was to..."],
    ),
    signposting: module(
      "Signposting e síntese",
      "Use marcadores para abrir, organizar, contrastar, destacar e concluir. Um marcador claro por movimento é suficiente.",
      "Signposting ajuda o ouvinte a seguir uma apresentação, treinamento, argumento ou atualização executiva.",
      [["Abertura", "Let me start with...", "Let me start with the business context."], ["Organização", "There are three points...", "There are three points we need to consider."], ["Conclusão", "To sum up...", "To sum up, we recommend a phased rollout."]],
      ["First, I will explain the current condition.", "More importantly, the risk is increasing.", "On the other hand, replacement requires a shutdown.", "To sum up, monitoring is the best short-term option."],
      "Evite empilhar conectores como “but however”. Escolha um. Também não use finally para qualquer ideia; reserve para o último ponto.",
      [["But however, the risk remains.", "However, the risk remains.", "Use apenas um marcador de contraste."], ["For conclude, we recommend option B.", "To conclude, we recommend option B.", "Expressão correta: to conclude."]],
      [["Complete a abertura: ___ start with the objective.", "Let me"], ["Introduza três pontos.", "There are three points we need to consider."], ["Corrija: For conclude, the project is viable.", "To conclude, the project is viable."], ["Escolha um contraste: In addition/On the other hand, the cost is higher.", "On the other hand"], ["Traduza: O ponto principal é que o risco continua alto.", "The main point is that the risk remains high."], ["Escreva uma conclusão com próximo passo.", "Model: To sum up, we recommend option B and ask for approval by Friday."]],
      ["Let me start with...", "There are three points to consider.", "The key point is...", "To sum up, I recommend..."],
    ),
    there: module(
      "There is/are e descrição técnica",
      "Use there is com singular/incontável e there are com plural. No passado use there was/were; no futuro, there will be.",
      "Use para apresentar a existência de componente, condição ou problema antes de detalhá-lo.",
      [["Presente singular", "There is + singular", "There is a leak near the seal gland."], ["Presente plural", "There are + plural", "There are two sensors on the bearing housing."], ["Passado/futuro", "There was/were · There will be", "There was a pressure drop. There will be another test."]],
      ["There is excessive vibration at the drive end.", "There are signs of contamination in the oil.", "There was no visible damage during inspection.", "There will be a planned shutdown next week."],
      "Não use have para existência: em vez de “Have a problem”, diga “There is a problem”.",
      [["Have two sensors on the pump.", "There are two sensors on the pump.", "Existência usa there are."], ["There is many alarms.", "There are many alarms.", "Plural usa are."]],
      [["Complete: There ___ a leak near the seal.", "is"], ["Complete: There ___ three open actions.", "are"], ["Passado: There is a pressure drop.", "There was a pressure drop."], ["Futuro: uma inspeção amanhã.", "There will be an inspection tomorrow."], ["Corrija: Have no evidence of damage.", "There is no evidence of damage."], ["Traduza: Havia dois sensores fora de serviço.", "There were two sensors out of service."]],
      ["There is evidence of...", "There are three main components...", "There was no sign of...", "There will be a need for..."],
    ),
    continuous: module(
      "Present continuous: agora e mudança temporária",
      "Use am/is/are + verbo-ing para ação em andamento, situação temporária e tendência em desenvolvimento.",
      "Compare present simple (rotina/estado normal) com present continuous (agora/mudança temporária).",
      [["Agora", "be + verbo-ing", "The technician is checking the pressure now."], ["Tendência", "be + verbo-ing", "Vibration is increasing gradually."], ["Temporário", "be + verbo-ing", "We are monitoring the unit this week."]],
      ["The pump is running below its normal load.", "Pressure is fluctuating between 3 and 5 bar.", "We are investigating an intermittent signal.", "The maintenance team is preparing the shutdown."],
      "Verbos de estado como know, need e understand normalmente não usam -ing: “I understand”, não “I am understanding”.",
      [["I am knowing the answer.", "I know the answer.", "Know é verbo de estado."], ["The pressure increasing.", "The pressure is increasing.", "Falta o verbo be."]],
      [["Complete: Vibration ___ (increase) now.", "is increasing"], ["Complete: We ___ (monitor) the pump this week.", "are monitoring"], ["Escolha: The sensor measures/is measuring pressure every second. (função permanente)", "measures"], ["Corrija: The team investigating the signal.", "The team is investigating the signal."], ["Traduza: A temperatura está caindo gradualmente.", "The temperature is falling gradually."], ["Pergunta: what / happen / now", "What is happening now?"]],
      ["At the moment, ... is...", "We are currently...", "The reading is gradually...", "Compared with yesterday, ... is..."],
    ),
    causeEffect: module(
      "Causa, efeito e análise técnica",
      "Use because/because of para causa; cause/lead to/result in para ligar causa a efeito; result from/be caused by para focar a origem.",
      "Diferencie causa raiz, fatores contribuintes e sintomas. Não transforme correlação em causa sem evidência.",
      [["Causa → efeito", "X caused/led to/resulted in Y", "Misalignment led to uneven seal-face wear."], ["Efeito → causa", "Y resulted from/was caused by X", "The leak was caused by contamination."], ["Contribuição", "X contributed to Y", "Poor lubrication contributed to the temperature rise."]],
      ["A blocked line caused a pressure drop.", "The shutdown resulted from repeated high-vibration alarms.", "Incorrect installation contributed to premature wear.", "Because of the unstable signal, we repeated the test."],
      "Because of + nome; because + oração. Result in recebe o efeito; result from recebe a causa.",
      [["The failure resulted in contamination. (contaminação causou falha)", "The failure resulted from contamination.", "From introduz a causa."], ["Because of the sensor failed, we stopped.", "Because the sensor failed, we stopped.", "Oração pede because."]],
      [["Complete: Contamination led ___ seal damage.", "to"], ["Complete: The shutdown resulted ___ high vibration.", "from"], ["Reescreva: The line was blocked. Pressure dropped. (caused)", "The blocked line caused a pressure drop."], ["Corrija: The leak resulted from in poor installation.", "The leak resulted from poor installation."], ["Traduza: A baixa vazão contribuiu para o superaquecimento.", "Low flow contributed to overheating."], ["Classifique: sintoma, fator contribuinte, causa raiz.", "Model: leakage = symptom; vibration = contributing factor; misalignment = root cause."]],
      ["The immediate symptom was...", "The evidence shows that... contributed to...", "The most likely root cause is...", "As a corrective action, we..."],
    ),
    recommendation: module(
      "Recomendações com ação, razão e condição",
      "Use recommend + nome/-ing; recommend that + sujeito + verbo base; should/need to para ações; must para requisito crítico.",
      "Uma recomendação forte informa ação, responsável, prazo, razão, condição de sucesso e risco de não agir.",
      [["Ação", "recommend + -ing", "We recommend replacing the damaged seal."], ["Pessoa", "recommend that + sujeito + verbo", "We recommend that the team inspect the coupling."], ["Necessidade", "need to/should + verbo", "The customer needs to confirm the shutdown window."]],
      ["We recommend monitoring vibration for seven days.", "The team should verify shaft alignment.", "The sensor needs to be recalibrated.", "The unit must remain offline until the risk is controlled."],
      "Não use “recommend to do” quando não há pessoa explícita. Prefira “recommend doing” ou “recommend that we do”.",
      [["We recommend to replace the seal.", "We recommend replacing the seal.", "Recommend recebe -ing."], ["I suggest you to check the data.", "I suggest that you check the data.", "Suggest that + verbo base."]],
      [["Complete: We recommend ___ (monitor) the unit.", "monitoring"], ["Complete: We recommend that the team ___ (inspect) the seal.", "inspect"], ["Corrija: The sensor needs recalibrate.", "The sensor needs to be recalibrated."], ["Traduza: Devemos verificar o alinhamento antes da partida.", "We should verify alignment before startup."], ["Adicione razão: We recommend an inspection...", "Model: We recommend an inspection because the vibration trend is unstable."], ["Adicione prazo e responsável.", "Model: The maintenance team should complete the inspection by Friday."]],
      ["Based on the evidence, we recommend...", "The team should... by...", "This action is necessary because...", "If we do not act, the main risk is..."],
    ),
    diplomacy: module(
      "Linguagem diplomática, softeners e discordância",
      "Use I understand..., From my perspective..., I may be missing something, but..., Would it be possible...? e could/might para reduzir confronto sem perder clareza.",
      "Diplomacia não é falta de posição. Reconheça o outro ponto, apresente a preocupação com evidência e proponha um caminho.",
      [["Reconhecer", "I understand your point...", "I understand your point about cost."], ["Discordar", "I see it differently because...", "I see it differently because the risk remains high."], ["Propor", "Would it be possible to...?", "Would it be possible to extend the test?"]],
      ["I agree with the objective, but I have a concern about the timing.", "From my perspective, option B offers a better balance.", "I may be missing something, but the scope appears incomplete.", "Could we explore a phased approach?"],
      "Evite “I disagree” sem explicação ou “You are wrong”. Foque na ideia, na evidência e no próximo passo.",
      [["You are wrong about the deadline.", "I see the deadline differently because the approval is still pending.", "Foco na questão, não na pessoa."], ["I want a discount.", "Would it be possible to review the commercial conditions?", "Pedido diplomático."]],
      [["Suavize: This plan will not work.", "I have some concerns about whether this plan will work."], ["Complete: I understand your point, ___ I am concerned about the risk.", "but/however"], ["Faça uma proposta diplomática.", "Could we explore a phased approach?"], ["Corrija o tom: You didn't understand me.", "Let me rephrase that more clearly."], ["Traduza: Talvez eu esteja deixando algo passar, mas o escopo parece incompleto.", "I may be missing something, but the scope appears incomplete."], ["Discorde e proponha próximo passo.", "Model: I see it differently because the evidence is limited. Could we run one more test?"]],
      ["I understand your point about...", "My concern is...", "Would it be possible to...?", "What if we...?"],
    ),
    articles: module(
      "Artigos e substantivos técnicos",
      "Use a/an para um item não específico; the para algo específico ou já mencionado; artigo zero para plural/incontável em sentido geral.",
      "Em inglês técnico, o artigo ajuda a distinguir um componente qualquer, o componente em análise e uma classe geral.",
      [["Um item", "a/an + singular", "We installed a sensor on the pump."], ["Específico", "the + nome", "The sensor is connected to the dashboard."], ["Geral", "plural/incontável sem artigo", "Sensors require calibration. Data quality matters."]],
      ["A technician collected an oil sample.", "The sample was sent to the laboratory.", "Equipment reliability depends on good maintenance.", "The data from the last test is incomplete."],
      "Não use a/an com incontáveis: an equipment, an information. Diga a piece of equipment/information.",
      [["We need an equipment.", "We need a piece of equipment.", "Equipment é incontável."], ["The reliability is important. (sentido geral)", "Reliability is important.", "Conceito geral não pede the."]],
      [["Complete: We installed ___ new sensor.", "a"], ["Complete: ___ sensor we installed is wireless.", "The"], ["Complete: ___ data quality is essential. (geral)", "— (sem artigo)"], ["Corrija: She gave me an information.", "She gave me some information/a piece of information."], ["Traduza: O relatório descreve uma falha no selo.", "The report describes a failure in the seal."], ["Explique a sequência a → the.", "First mention: a sensor; later/specific mention: the sensor."]],
      ["We collected data from...", "The data shows...", "A possible limitation is...", "The main source is..."],
    ),
    relative: module(
      "Relative clauses: definir pessoas, coisas e papéis",
      "Use who para pessoas, which para coisas e that para ambos em orações definidoras. Use where para lugares e whose para posse.",
      "Use para explicar stakeholders, componentes, critérios e relações sem criar várias frases curtas.",
      [["Pessoa", "pessoa + who + verbo", "The engineer who leads the review is in Houston."], ["Coisa", "coisa + that/which + verbo", "The sensor that failed was under warranty."], ["Posse", "pessoa/coisa + whose + nome", "The customer whose contract expires in June requested a meeting."]],
      ["The manager who approves the budget is unavailable.", "We need a sensor that can detect low-frequency vibration.", "This is the site where the failure occurred.", "The supplier whose proposal we selected has confirmed delivery."],
      "Não use what depois de um nome definido: “the sensor that...”, não “the sensor what...”.",
      [["The engineer which called us...", "The engineer who called us...", "Pessoa usa who."], ["The sensor what failed...", "The sensor that failed...", "Depois do nome use that/which."]],
      [["Una: The manager approves the budget. She is unavailable.", "The manager who approves the budget is unavailable."], ["Una: The sensor failed. It was under warranty.", "The sensor that failed was under warranty."], ["Complete: the customer ___ contract expires", "whose"], ["Corrija: This is the plant which the failure occurred.", "This is the plant where the failure occurred."], ["Traduza: Precisamos de um sistema que gere alertas confiáveis.", "We need a system that generates reliable alerts."], ["Defina stakeholder com who.", "Model: A stakeholder is a person who influences or is affected by a decision."]],
      ["The person who...", "The system that...", "The site where...", "The stakeholder whose role is..."],
    ),
    causatives: module(
      "Causatives e responsabilidade",
      "Use have/get + objeto + particípio quando outra pessoa executa o serviço; make + pessoa + verbo para obrigar; let + pessoa + verbo para permitir.",
      "Em delegação, deixe resultado, owner e prazo explícitos; use causative apenas quando o foco é providenciar o serviço.",
      [["Providenciar", "have/get + objeto + particípio", "We had the sensor calibrated."], ["Obrigar", "make + pessoa + verbo", "The risk made us change the plan."], ["Permitir", "let + pessoa + verbo", "Let the technician complete the test."]],
      ["We will have the seal inspected tomorrow.", "The customer had the contract reviewed by legal.", "The incident made the team revise the procedure.", "The manager let us test a second option."],
      "Have something done não significa fazer pessoalmente; significa providenciar para que alguém faça.",
      [["We had calibrated the sensor. (outra pessoa fez)", "We had the sensor calibrated.", "Objeto vem antes do particípio."], ["The manager made us to wait.", "The manager made us wait.", "Make não usa to."]],
      [["Complete: We had the report ___ (review) by legal.", "reviewed"], ["Complete: The failure made us ___ (stop) the unit.", "stop"], ["Complete: Let the technician ___ (finish) the test.", "finish"], ["Corrija: We will have inspect the seal.", "We will have the seal inspected."], ["Traduza: Mandamos calibrar os sensores.", "We had the sensors calibrated."], ["Delegue com resultado e prazo.", "Model: Please have the final report reviewed by Thursday."]],
      ["I need you to... by...", "We will have... completed by...", "You are responsible for...", "Let's check progress on..."],
    ),
    feedback: module(
      "Feedback: observação, impacto e próximo comportamento",
      "Use I noticed + fato observável; when + situação; the impact was...; next time, could you...? Evite rótulos pessoais.",
      "Feedback útil é específico, baseado em comportamento e orientado à melhoria, com espaço para a perspectiva da outra pessoa.",
      [["Observação", "I noticed that...", "I noticed that the report was sent after the deadline."], ["Impacto", "The impact was...", "The impact was that the customer had less time to review it."], ["Pedido", "Next time, could you...?", "Next time, could you flag the delay earlier?"]],
      ["I noticed that two actions had no owner.", "When this happens, the follow-up becomes unclear.", "The impact was a two-day delay.", "What support would help you meet the next deadline?"],
      "Evite “You are disorganized”. Descreva o comportamento e seu impacto: “The actions were not assigned, so the follow-up was delayed.”",
      [["You are not committed.", "I noticed that the last two updates were submitted late.", "Troque julgamento por observação."], ["You always forget everything.", "Two actions were not included in the last update.", "Evite always/never sem evidência."]],
      [["Transforme julgamento em fato: You are careless.", "I noticed that three values were not checked before submission."], ["Complete: The impact ___ a two-day delay.", "was"], ["Faça um pedido para a próxima vez.", "Next time, could you verify the values before submitting the report?"], ["Corrija o tom: You never communicate.", "I noticed that the last two changes were not communicated to the team."], ["Traduza: Que apoio ajudaria você a cumprir o prazo?", "What support would help you meet the deadline?"], ["Monte observação + impacto + pedido.", "Model: I noticed that the action had no owner. The impact was a delay. Next time, could you assign an owner before closing the meeting?"]],
      ["I noticed that...", "When this happened,...", "The impact was...", "Next time, could you...?"],
    ),
    usedTo: module(
      "Used to, be used to e get used to",
      "Used to + verbo = hábito/estado passado que mudou. Be used to + nome/-ing = estar acostumado. Get used to + nome/-ing = acostumar-se.",
      "Use para explicar mudança de processo, comportamento, ferramenta e adaptação da equipe.",
      [["Passado mudado", "used to + verbo", "We used to inspect the pump monthly."], ["Acostumado", "be used to + -ing", "The team is used to working remotely."], ["Adaptação", "get used to + -ing", "Operators are getting used to using the new dashboard."]],
      ["We used to manage actions by email.", "I am used to presenting in English.", "The team is getting used to the new procedure.", "It took us two weeks to get used to the system."],
      "Depois de be/get used to, to é preposição e pede nome ou -ing: “used to working”. Depois de used to (passado), use verbo base.",
      [["I am used to work remotely.", "I am used to working remotely.", "Be used to pede -ing."], ["We used to working on paper.", "We used to work on paper.", "Used to passado pede verbo base."]],
      [["Complete: We used to ___ (track) actions by email.", "track"], ["Complete: I am used to ___ (speak) with customers.", "speaking"], ["Complete: The team is getting used to ___ (use) the tool.", "using"], ["Corrija: She is used to present online.", "She is used to presenting online."], ["Traduza: Antes fazíamos inspeções mensais.", "We used to perform monthly inspections."], ["Explique uma mudança usando as três formas.", "Model: We used to work on paper. We are now used to the dashboard. New users are getting used to it."]],
      ["We used to..., but now...", "The team is used to...", "We are still getting used to...", "The main change will be..."],
    ),
    perfectContinuous: module(
      "Present perfect continuous: atividade em progresso",
      "Use have/has been + verbo-ing para atividade iniciada no passado que continua ou tem efeito visível agora.",
      "Compare present perfect simple (resultado/quantidade concluída) com continuous (duração/processo).",
      [["Duração", "have/has been + -ing + for/since", "We have been monitoring the unit for six weeks."], ["Efeito atual", "have/has been + -ing", "The seal has been leaking, so we scheduled an inspection."], ["Resultado", "have/has + particípio", "We have collected 120 readings."]],
      ["The customer has been using the platform since March.", "We have been tracking value realization for three quarters.", "The team has completed four improvement actions.", "How long have you been working with this account?"],
      "Verbos de estado raramente vão no continuous: use “I have known the customer for years”, não “have been knowing”.",
      [["I have been knowing him since 2020.", "I have known him since 2020.", "Know é verbo de estado."], ["She has monitoring the account.", "She has been monitoring the account.", "Falta been."]],
      [["Complete: We ___ been monitoring the account for six months.", "have"], ["Complete: She has been ___ (track) the risk.", "tracking"], ["Escolha: We have completed/have been completing four actions.", "have completed"], ["Corrija: They have working here since May.", "They have been working here since May."], ["Traduza: Há quanto tempo você vem monitorando esta conta?", "How long have you been monitoring this account?"], ["Contraste processo × resultado.", "We have been reviewing the data for two hours. We have reviewed 300 records."]],
      ["We have been... since...", "Over the last..., we have been...", "So far, we have completed...", "This ongoing work has resulted in..."],
    ),
    purpose: module(
      "Propósito, resultado e valor",
      "Use to/in order to + verbo para propósito; so that + oração para objetivo com sujeito; so/therefore/as a result para consequência.",
      "Conecte atividade a resultado do cliente: o que fazemos, para quê, como medimos e qual valor isso cria.",
      [["Propósito curto", "to + verbo", "We installed sensors to detect early failure."], ["Propósito com sujeito", "so that + sujeito + verbo", "We created alerts so that operators can respond faster."], ["Resultado", "As a result, + oração", "As a result, downtime decreased by 12%."],
      ],
      ["We review the data to identify emerging risks.", "The team simplified the dashboard so that managers can act faster.", "We introduced weekly reviews in order to improve accountability.", "As a result, the customer avoided two shutdowns."],
      "Não use for + verbo base para propósito: diga “to reduce cost”, não “for reduce cost”. For pode vir com nome ou -ing em função: “for training”.",
      [["We installed sensors for detect failures.", "We installed sensors to detect failures.", "Propósito usa to + verbo."], ["We reduced risk for the customer acts faster.", "We reduced risk so that the customer can act faster.", "Oração com sujeito usa so that."]],
      [["Complete: We monitor vibration ___ detect early failure.", "to/in order to"], ["Complete: We added alerts ___ operators can respond faster.", "so that"], ["Corrija: The training was created for improve safety.", "The training was created to improve safety."], ["Una com resultado: We changed the process. Downtime fell.", "We changed the process. As a result, downtime fell."], ["Traduza: Criamos o plano para aumentar a confiabilidade.", "We created the plan to increase reliability."], ["Escreva atividade → propósito → resultado.", "Model: We installed sensors to detect anomalies early. As a result, the team prevented an unplanned shutdown."]],
      ["We... to...", "The purpose is to...", "This enables the customer to...", "As a result,..."],
    ),
    time: module(
      "Time clauses, prazos e compromissos",
      "Depois de when, before, after, until, as soon as e once, use present simple para futuro; a oração principal pode usar will.",
      "Use by para prazo limite; until para continuidade até um ponto; within para período máximo; on para dia/data.",
      [["Evento futuro", "when + presente, will + verbo", "When we receive the data, we will update the report."], ["Prazo", "by + ponto final", "Please confirm by Friday."], ["Período", "within + duração", "We will respond within 24 hours."]],
      ["As soon as the customer approves, we will start.", "Please send the file by 3 p.m. on Thursday.", "We will monitor the unit until the shutdown.", "Once the test is complete, the team will share the results."],
      "Não use will na oração temporal comum: “When we receive...”, não “When we will receive...”. By Friday = até, no máximo; until Friday = continuando até sexta.",
      [["When we will finish, we will call you.", "When we finish, we will call you.", "Oração temporal usa presente."], ["Send it until Friday. (prazo único)", "Send it by Friday.", "By marca deadline."]],
      [["Complete: When we ___ (receive) approval, we will start.", "receive"], ["Escolha: Please reply by/until Friday. (prazo)", "by"], ["Complete: We will monitor the signal ___ the shutdown.", "until"], ["Corrija: As soon as the part will arrive, we will install it.", "As soon as the part arrives, we will install it."], ["Traduza: Responderemos em até 24 horas.", "We will respond within 24 hours."], ["Escreva compromisso com owner e prazo.", "Model: Maria will confirm the sensor list by 4 p.m. on Wednesday."]],
      ["I will... by...", "As soon as..., we will...", "We will continue... until...", "You can expect... within..."],
    ),
    writing: module(
      "Escrita profissional: clareza, tom e concisão",
      "Prefira sujeito visível, verbo forte, uma ideia principal por frase e parágrafos com propósito. Estruture: contexto → ponto principal → ação/pedido → prazo.",
      "Use registro direto e cortês. Corte traduções longas como “I would like to be informing” e use “I am writing to confirm”.",
      [["Objetivo", "I am writing to + verbo", "I am writing to confirm the revised scope."], ["Pedido", "Could you please + verbo", "Could you please approve it by Friday?"], ["Fechamento", "Please let me know if...", "Please let me know if you have any questions."]],
      ["The inspection identified two priority actions.", "We recommend replacing the damaged seal during the planned shutdown.", "Please confirm the shutdown window by Thursday.", "I have attached the updated action list for your review."],
      "Evite subject vazio e nominalizações: “It is necessary to make an evaluation” → “We need to evaluate”.",
      [["I would like to be informing you that...", "I am writing to confirm that...", "Forma direta e natural."], ["Make the verification of the values.", "Verify the values.", "Use verbo forte."]],
      [["Encurte: We would like to make a recommendation for the replacement of the seal.", "We recommend replacing the seal."], ["Complete: I am writing ___ confirm the deadline.", "to"], ["Torne cortês: Approve this today.", "Could you please approve this today?"], ["Corrija: Please, find attached the report.", "Please find the report attached./I have attached the report."], ["Traduza: Por favor, confirme o responsável até sexta-feira.", "Please confirm the owner by Friday."], ["Organize: pedido → contexto → prazo → saudação.", "Context → purpose/request → deadline/next step → closing."]],
      ["I am writing to...", "The main point is...", "Could you please... by...?", "Please let me know if..."],
    ),
    review: module(
      "Revisão integrada: precisão e fluência",
      "Recupere estruturas sem olhar, combine tempos verbais e escolha a forma pelo significado: rotina, ação atual, evento concluído, experiência, plano, condição ou processo passivo.",
      "Use esta sessão para identificar padrões de erro, repetir a produção e transferir a linguagem para uma situação real.",
      [["Rotina", "present simple", "We review the dashboard every Monday."], ["Evento concluído", "past simple", "We inspected the seal yesterday."], ["Resultado até agora", "present perfect", "We have reduced downtime this quarter."]],
      ["The team usually reviews the data before the meeting.", "We were monitoring the pump when the alarm activated.", "The cause has not been confirmed yet.", "If the risk increases, we will stop the unit."],
      "Não escolha o tempo pela tradução de uma palavra isolada. Procure marcadores de tempo e a relação da ação com o presente.",
      [["We have visited the site yesterday.", "We visited the site yesterday.", "Tempo passado terminado pede past simple."], ["If the risk will increase, we will stop.", "If the risk increases, we will stop.", "If + presente na condição real."]],
      [["Rotina: We ___ (check) the alarms daily.", "check"], ["Ontem: We ___ (find) a leak.", "found"], ["Desde janeiro: We ___ (reduce) downtime.", "have reduced"], ["Agora: Pressure ___ (fall).", "is falling"], ["Passiva: The seal ___ (replace) last week.", "was replaced"], ["Condição: If the sensor fails, we ___ (stop) the test.", "will stop"]],
      ["In my role, I usually...", "Yesterday, we...", "So far, we have...", "If..., we will..."],
    ),
  };

  const contexts = {
    1: { setting: "weekly reliability routine", subject: "the reliability coordinator", situation: "organizes priorities, customer requests and follow-up actions", evidence: "clear roles and consistent routines reduce missed actions", action: "confirm responsibilities and communicate the next step", outcome: "build a predictable professional routine" },
    2: { setting: "recent site visit", subject: "the service team", situation: "investigated an unexpected pressure change during startup", evidence: "the timeline connects the first symptom, the inspection and the corrective action", action: "document what happened and prepare the next visit", outcome: "explain past events and future plans clearly" },
    3: { setting: "cross-functional meeting", subject: "the meeting leader", situation: "needs to clarify evidence, guide a decision and assign owners", evidence: "short questions and explicit deadlines prevent ambiguous follow-up", action: "summarize the decision and confirm each action", outcome: "turn discussion into accountable execution" },
    4: { setting: "customer opportunity review", subject: "the account team", situation: "is connecting reliability needs to a commercial proposal", evidence: "the customer values lower downtime, safer operation and measurable savings", action: "compare options and explain the value case", outcome: "build trust and advance the opportunity" },
    5: { setting: "operating performance review", subject: "the operations manager", situation: "is reviewing KPIs, resources, risks and corrective actions", evidence: "availability improved, but two risks still require escalation", action: "prioritize the highest-impact action", outcome: "protect performance with evidence-based decisions" },
    6: { setting: "technical training session", subject: "the instructor", situation: "is demonstrating a monitoring workflow to maintenance technicians", evidence: "a clear sequence and controlled questions improve understanding", action: "explain each step and check comprehension", outcome: "help the team use the process safely and independently" },
    7: { setting: "mechanical-seal reliability review", subject: "the reliability engineer", situation: "is assessing leakage, vibration, temperature and pressure evidence", evidence: "the readings suggest a developing issue but do not yet prove one root cause", action: "state the confidence level and recommend the next inspection", outcome: "avoid both premature conclusions and delayed action" },
    8: { setting: "implementation steering meeting", subject: "the project manager", situation: "is aligning milestones, stakeholders, risks and commercial commitments", evidence: "the technical plan is viable if approvals arrive on time", action: "negotiate conditions and confirm owners", outcome: "move from strategy to controlled execution" },
    9: { setting: "executive committee update", subject: "the business leader", situation: "must request a decision in a concise and persuasive message", evidence: "three data points support a phased reliability investment", action: "anticipate objections and state the decision required", outcome: "help executives decide with confidence" },
    10: { setting: "contract negotiation", subject: "the commercial manager", situation: "is discussing scope, price, liability, warranty and service levels", evidence: "both parties can gain value if each concession has a clear condition", action: "trade concessions without giving value away", outcome: "reach a workable agreement and preserve the relationship" },
    11: { setting: "business review with data", subject: "the analyst", situation: "is checking data quality before explaining trends and financial impact", evidence: "availability rose while maintenance cost remained stable", action: "separate facts, interpretation and outlook", outcome: "present a defensible analytical story" },
    12: { setting: "team change initiative", subject: "the team leader", situation: "is delegating work, coaching performance and addressing resistance", evidence: "specific feedback and inclusive questions improve ownership", action: "agree on the next behavior and support needed", outcome: "align the team without damaging trust" },
    13: { setting: "advanced pump reliability review", subject: "the maintenance and reliability team", situation: "is ranking asset criticality and interpreting condition-monitoring signals", evidence: "a combination of vibration, temperature and process data narrows the failure hypothesis", action: "define thresholds, inspection steps and a safe action plan", outcome: "reduce failure risk with disciplined monitoring" },
    14: { setting: "strategic account review", subject: "the customer success manager", situation: "is proving realized value and preparing renewal and expansion", evidence: "completed actions reduced downtime and improved response time", action: "link outcomes to customer priorities and propose the next roadmap", outcome: "earn renewal through measurable value" },
    15: { setting: "global collaboration meeting", subject: "the regional facilitator", situation: "is coordinating direct and indirect communication styles across time zones", evidence: "confirmation checks and respectful turn-taking reduce rework", action: "rephrase the message and confirm shared understanding", outcome: "create alignment without cultural stereotypes" },
    16: { setting: "high-stakes written update", subject: "the program owner", situation: "is integrating evidence, decisions, requests and deadlines in a concise document", evidence: "the reader needs the main point and required action immediately", action: "edit for structure, tone and accuracy", outcome: "produce professional writing that leads to action" },
  };

  function selectGrammar(grammar) {
    const text = grammar.toLowerCase();
    if (text.includes("present perfect continuous")) return grammarModules.perfectContinuous;
    if (text.includes("second conditional")) return grammarModules.conditional2;
    if (text.includes("present perfect")) return grammarModules.presentPerfect;
    if (text.includes("past continuous")) return grammarModules.pastContinuous;
    if (text.includes("passive") || text.includes("voz passiva")) return grammarModules.passive;
    if (text.includes("reported")) return grammarModules.reported;
    if (text.includes("there is")) return grammarModules.there;
    if (text.includes("used to")) return grammarModules.usedTo;
    if (text.includes("causative")) return grammarModules.causatives;
    if (text.includes("relative clause")) return grammarModules.relative;
    if (text.includes("purpose clause")) return grammarModules.purpose;
    if (text.includes("artigos") || text.includes("substantivos técnicos")) return grammarModules.articles;
    if (text.includes("past simple") || text.includes("passado simples")) return grammarModules.pastSimple;
    if (text.includes("present continuous")) return grammarModules.continuous;
    if (text.includes("presente simples")) return grammarModules.presentSimple;
    if (text.includes("going to")) return grammarModules.goingTo;
    if (text.includes("will") || text.includes("previsões")) return grammarModules.will;
    if (text.includes("do/does") || text.includes("question word") || text.includes("perguntas consultivas")) return grammarModules.questions;
    if (text.includes("perguntas indiretas") || text.includes("pedidos indiretos") || text.includes("repair language") || text.includes("paráfrase")) return grammarModules.indirectQuestions;
    if (text.includes("advérbios de frequência")) return grammarModules.frequency;
    if (text.includes("have, can") || text.includes("habilidades")) return grammarModules.ability;
    if (text.includes("quantific") || text.includes("countable") || text.includes("números")) return grammarModules.quantifiers;
    if (text.includes("comparativ") || text.includes("superlativ") || text.includes("twice as")) return grammarModules.comparatives;
    if (text.includes("tendên") || text.includes("trend") || text.includes("porcentagens") || text.includes("proporções")) return grammarModules.trends;
    if (text.includes("first conditional") || text.includes("condicionais básicas")) return grammarModules.conditional1;
    if (text.includes("conditional offers") || text.includes("provided that") || text.includes("concess")) return grammarModules.conditional2;
    if (text.includes("should") || text.includes("must") || text.includes("recommend") || text.includes("dedução")) return grammarModules.recommendation;
    if (text.includes("modalizadores") || text.includes("hedging") || text.includes("probabilidade") || text.includes("cautious")) return grammarModules.hedging;
    if (text.includes("causa") || text.includes("cause") || text.includes("result")) return grammarModules.causeEffect;
    if (text.includes("signposting") || text.includes("discurso") || text.includes("síntese")) return grammarModules.signposting;
    if (text.includes("sequenciamento") || text.includes("sequência")) return grammarModules.sequence;
    if (text.includes("imperativos") || text.includes("instrucional")) return grammarModules.polite;
    if (text.includes("diplom") || text.includes("direct e indirect") || text.includes("softener") || text.includes("inclusiv")) return grammarModules.diplomacy;
    if (text.includes("feedback") || text.includes("i noticed")) return grammarModules.feedback;
    if (text.includes("time clause") || text.includes("deadline") || text.includes("commitment") || text.includes("future forms")) return grammarModules.time;
    if (text.includes("word order") || text.includes("formalidade") || text.includes("concisão") || text.includes("parallel structure")) return grammarModules.writing;
    if (text.includes("because") || text.includes("although") || text.includes("however")) return grammarModules.connectors;
    if (text.includes("to be") || text.includes("pronomes")) return grammarModules.be;
    if (text.includes("revisão")) return grammarModules.review;
    return grammarModules.review;
  }

  function pronunciationFor(day) {
    const grammar = day.grammar.toLowerCase();
    if (grammar.includes("passado") || grammar.includes("past")) return { target: "Final -ed e consoantes finais", tip: "/t/ em worked, /d/ em planned, /ɪd/ em needed. Não acrescente uma vogal final em worked ou stopped.", drill: "worked · planned · needed · checked the seal · reviewed the trend" };
    if (grammar.includes("presente simples") || grammar.includes("frequência")) return { target: "Terceira pessoa -s", tip: "/s/ em checks, /z/ em plans, /ɪz/ em manages. Mantenha a consoante final audível.", drill: "checks · plans · manages · The manager checks and updates." };
    if (grammar.includes("will") || grammar.includes("future")) return { target: "Contrações naturais", tip: "Treine I'll, we'll, won't e it'll sem engolir o verbo principal.", drill: "I'll confirm · we'll review · it won't fail · we'll send it by Friday" };
    if (grammar.includes("pergunta") || grammar.includes("question")) return { target: "Auxiliar fraco, palavra-chave forte", tip: "Dê menos força a do/does/did e destaque a informação: WHAT does the SENSOR measure?", drill: "What does it mean? · When did it start? · Could you explain that?" };
    if (grammar.includes("passiva") || grammar.includes("passive")) return { target: "Particípios e grupos de sentido", tip: "Una auxiliar + particípio: was_REPLACED, has_been_APPROVED, will_be_CONFIRMED.", drill: "is reviewed · was replaced · has been completed · will be confirmed" };
    return { target: "Ritmo e palavras tônicas", tip: "Destaque nomes, verbos, adjetivos e números; reduza palavras gramaticais. Fale em blocos curtos, não palavra por palavra.", drill: "The MAIN risk · is the PRESSURE trend · during STARTUP." };
  }

  function createReading(day, guide, ctx) {
    const [term1, term2, term3] = day.vocabularyTerms;
    const text = `During a ${ctx.setting}, ${ctx.subject} is working on today's communication task. The immediate situation is clear: ${ctx.situation}. The team uses “${term1}”, “${term2}” and “${term3}” as useful language for the discussion. ${guide.examples[(day.day - 1) % guide.examples.length]} The available evidence shows that ${ctx.evidence}. The recommended next step is to ${ctx.action}. This should help the team ${ctx.outcome}.`;
    return {
      title: `Mini-case: ${day.focus}`,
      text,
      gist: "What is the main purpose of this mini-case?",
      gistAnswer: "To practice today's target language in a realistic professional context.",
      details: [
        ["What evidence or business reason is mentioned?", ctx.evidence],
        ["What action should happen next?", ctx.action],
        ["Which three daily chunks appear in the text?", `${term1}; ${term2}; ${term3}.`],
      ],
    };
  }

  function createSpeaking(day, guide, ctx) {
    return {
      scenario: `You are in a ${ctx.setting}. Your goal is to present the situation and evidence, then ${ctx.action}.`,
      steps: [
        "30 seconds: state the context and your objective.",
        "60 seconds: explain two facts or pieces of evidence.",
        "60 seconds: give your recommendation, decision or next step.",
        "30 seconds: summarize and invite one question.",
      ],
      frames: guide.frames,
      rescue: ["Let me rephrase that.", "What I mean is...", "The key point is...", "I don't know the exact answer yet, but I can confirm it after this meeting."],
      model: `Let me start with the context. We are discussing the current situation in our ${ctx.setting}. The main evidence is that ${ctx.evidence}. ${guide.examples[(day.day + 1) % guide.examples.length]} Based on this, I recommend that we ${ctx.action}. The main benefit is that this will help us ${ctx.outcome}. To sum up, we need one clear owner and one confirmed deadline. What questions do you have?`,
    };
  }

  function createWriting(day, guide, ctx) {
    const range = day.week <= 4 ? [80, 110] : day.week <= 8 ? [90, 120] : [110, 150];
    const [term1, term2] = day.vocabularyTerms;
    return {
      range,
      task: `Write a ${range[0]}–${range[1]} word professional message for a ${ctx.setting}. Include one fact, one piece of evidence, one recommendation and one deadline.`,
      structure: [
        ["1. Context", "Why are you writing or speaking?"],
        ["2. Evidence", "What happened or what do the data show?"],
        ["3. Recommendation", "What should happen, who owns it and why?"],
        ["4. Next step", "What must be confirmed, and by when?"],
      ],
      phraseBank: [...guide.frames.slice(0, 3), term1, term2],
      model: `Subject: ${ctx.setting} — recommended next step\n\nHello team,\n\nI am writing to summarize our discussion about the current situation. The evidence shows that ${ctx.evidence}. ${guide.examples[day.day % guide.examples.length]} This is important because it may affect our ability to ${ctx.outcome}.\n\nBased on the information available, I recommend that we ${ctx.action}. Please confirm the action owner and deadline by Friday at 3 p.m. We should also record the decision and review the result at the next meeting.\n\nPlease let me know if you need any clarification.\n\nBest regards,`,
      checklist: ["Clear purpose in the first two lines", "Subject + verb in every complete sentence", `At least one target structure: ${day.grammar}`, "One fact and one interpretation are clearly separated", "Action + owner + deadline", "Final check of verb tense, articles and prepositions"],
    };
  }

  function createLesson(day) {
    const guide = selectGrammar(day.grammar);
    const ctx = contexts[day.week] || contexts[16];
    const reading = createReading(day, guide, ctx);
    const speaking = createSpeaking(day, guide, ctx);
    const writing = createWriting(day, guide, ctx);
    return {
      id: day.id,
      level: day.week <= 4 ? "A2→B1" : day.week <= 8 ? "B1" : "B1→B2",
      objective: `By the end, I can ${ctx.outcome}.`,
      grammar: guide,
      reading,
      speaking,
      writing,
      pronunciation: pronunciationFor(day),
      retrieval: [
        `Without looking, say the core rule for ${guide.name}.`,
        `Use three daily chunks in new sentences: ${day.vocabularyTerms.slice(0, 3).join(" · ")}.`,
        `Record a 60-second answer about ${day.focus.toLowerCase()}; listen once and repeat with one improvement.`,
        "Tomorrow: reproduce your best sentence and correct one recurring error from memory.",
      ],
    };
  }

  const lessons = Object.fromEntries(program.days.map((day) => [day.id, createLesson(day)]));
  window.ENGLISH_MOMENTUM_LESSONS = {
    version: "2.0.0-study-edition",
    generatedFor: program.meta.title,
    totalLessons: Object.keys(lessons).length,
    lessons,
  };
})();
