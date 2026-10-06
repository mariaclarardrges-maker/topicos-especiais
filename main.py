# --- SISTEMA ESPECIALISTA INTERATIVO: TRIAGEM M�DICA SIMPLIFICADA ---
# Algoritmo de Motor de Infer�ncia com Encadeamento Progressivo (Forward Chaining)

def executar_triagem_medica():
    print("=== SISTEMA ESPECIALISTA DE TRIAGEM M�DICA ===")
    
    # 1. ENTRADA DE DADOS INTERATIVA
    # O usu�rio digita a temperatura (Dado Bruto)
    try:
        temperatura_paciente = float(input("Digite a temperatura corporal do paciente (ex: 38.5): "))
    except ValueError:
        print(" [ERRO] Por favor, digite um n�mero v�lido para a temperatura.")
        return

    # O usu�rio informa se h� outros sintomas
    resposta_calafrios = input("O paciente est� sentindo calafrios? (S/N): ").strip().upper()
    
    # Inicializa a Base de Fatos com base na resposta do usu�rio
    base_de_fatos = set()
    if resposta_calafrios == "S":
        base_de_fatos.add("calafrios")
    
    # Vari�vel de controle para o ciclo do motor
    novos_fatos_adicionados = True
    
    print("\n=== INICIANDO MOTOR DE INFER�NCIA ===")
    print(f"Fatos iniciais na mem�ria: {base_de_fatos}\n")

    # 2. CICLO DE INFER�NCIA (Roda enquanto novas conclus�es forem geradas)
    ciclo = 1
    while novos_fatos_adicionados:
        print(f"--- Varredura {ciclo} da Base de Regras ---")
        novos_fatos_adicionados = False
        
        # REGRA 1: SE (temperatura > 37.8) ENT�O adicionar (estado_feveril)
        if temperatura_paciente > 37.8 and "estado_feveril" not in base_de_fatos:
            base_de_fatos.add("estado_feveril")
            print("-> Regra 1 disparada! Dado bruto transformado em Informa��o: [estado_feveril]")
            novos_fatos_adicionados = True
            
        # REGRA 2: SE (estado_feveril E calafrios) ENT�O adicionar (suspeita_infeccao)
        if "estado_feveril" in base_de_fatos and "calafrios" in base_de_fatos and "suspeita_infeccao" not in base_de_fatos:
            base_de_fatos.add("suspeita_infeccao")
            print("-> Regra 2 disparada! Sintomas combinados geraram: [suspeita_infeccao]")
            novos_fatos_adicionados = True
            
        # REGRA 3: SE (suspeita_infeccao) ENT�O adicionar (alerta_administrar_antitermico)
        if "suspeita_infeccao" in base_de_fatos and "alerta_administrar_antitermico" not in base_de_fatos:
            base_de_fatos.add("alerta_administrar_antitermico")
            print("-> Regra 3 disparada! Conhecimento aplicado gerou a��o: [alerta_administrar_antitermico]")
            novos_fatos_adicionados = True
            
        if not novos_fatos_adicionados:
            print("Nenhuma nova regra foi disparada nesta varredura.")
            
        print(f"Estado atual da Base de Fatos: {base_de_fatos}\n")
        ciclo += 1

    # 3. RESULTADO FINAL (Tomada de Decis�o do Sistema Especialista)
    print("=== CICLO DE INFER�NCIA CONCLU�DO ===")
    print(f"Base de Fatos Final: {base_de_fatos}\n")
    
    if "alerta_administrar_antitermico" in base_de_fatos:
        print(" [RECOMENDA��O M�DICA]: Paciente com febre alta e sintomas associados.")
        print("                         Administrar antit�rmicos e manter monitoramento hospitalar.")
    elif "estado_feveril" in base_de_fatos:
        print(" [AVISO]: Paciente apresenta estado febril leve, mas sem sintomas secund�rios (calafrios).")
        print("          Monitore a temperatura e repouse.")
    else:
        print(" [AVISO]: Temperatura dentro da normalidade. Monitore caso surjam novos sintomas.")

# Executa o programa
if __name__ == "__main__":
    executar_triagem_medica()
