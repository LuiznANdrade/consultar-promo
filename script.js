const config = {
    "Recruta": { dias: 5, proximaPatente: "Soldado de 2ª Classe" },
    "Soldado2Classe": { dias: 20, proximaPatente: "Soldado de 1ª Classe" },
    "Soldado1Classe": { dias: 30, proximaPatente: "Cabo" },
    "Cabo": { dias: 35, proximaPatente: "3° Sargento" },
    "3Sargento": { dias: 35, proximaPatente: "2° Sargento" },
    "2Sargento": { dias: 40, proximaPatente: "1° Sargento" },
    "1Sargento": { dias: 45, proximaPatente: "Sub-Tenente" },
    "SubTenente": { dias: 45, proximaPatente: "Aspirante a Oficial" },
    "Aspirante": { dias: 50, proximaPatente: "2° Tenente" },
    "2Tenente": { dias: 50, proximaPatente: "1° Tenente" },
    "1Tenente": { dias: 50, proximaPatente: "Capitão" },
    "Capitao": { dias: 50, proximaPatente: "Major" },
    "": { desconto: 0 }, // Desconto de 0%
    "InstrutorRecrutamento": { desconto: 0.18 }, // Desconto de 18%
    "InstrutorCurso": { desconto: 0.12 }, // Desconto de 12%
    "InstrutorGeral": { desconto: 0.15 }, // Desconto de 15%
    "ControleInterno": { desconto: 0.15 }, // Desconto de 15%
    "Administrativo": { desconto: 0.15 }, // Desconto de 15%
};

function calcularPromocao() {
    console.log('Função calcularPromocao chamada');
    const patenteSelecionada = document.getElementById('patente').value;
    console.log('Patente Selecionada:', patenteSelecionada);
    const instrutorSelecionado = document.getElementById('instrutor').value;
    const dataEntradaValue = document.getElementById('dataEntrada').value;

    // Validação da Data de Entrada
    if (!dataEntradaValue) {
        console.error('Data de entrada inválida');
        return;
    }

    const dataEntrada = new Date(dataEntradaValue);

    // Verificação de Data Válida
    if (isNaN(dataEntrada.getTime())) {
        console.error('Data de entrada inválida');
        return;
    }

    let diasParaPromocao = config[patenteSelecionada].dias;

    // Se for uma patente válida, aplica o desconto
    if (config[patenteSelecionada].hasOwnProperty('desconto')) {
        let descontoPatente = config[patenteSelecionada].desconto;

        // Se for instrutor, aplica também o desconto de instrutor
        if (instrutorSelecionado && instrutorSelecionado.includes('Instrutor')) {
            descontoPatente += config[instrutorSelecionado].desconto;
        }

        diasParaPromocao = Math.round(diasParaPromocao * (1 - descontoPatente));
    }

    const dataPromocao = new Date(dataEntrada);
    dataPromocao.setUTCDate(dataPromocao.getUTCDate() + diasParaPromocao);

    const hoje = new Date();
    const diffTime = dataPromocao - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const resultadoElement = document.getElementById('resultado');

    if (diffDays > 0) {
        const dataFormatada = dataPromocao.toLocaleDateString('pt-BR'); // Ajuste o locale conforme necessário
        alert(`Faltam ${diffDays} dias para você subir para ${config[patenteSelecionada].proximaPatente} em ${dataFormatada}`);
    } else {
        alert(`Você deveria ter sido promovido há ${Math.abs(diffDays)} dias para ${config[patenteSelecionada].proximaPatente}`);
    }
}
