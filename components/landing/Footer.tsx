// 📁 components/landing/Footer.tsx

export const Footer = () => {
  return (
    <footer id="contato" className="bg-brand-dark py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-brand-accent mb-4">StyleChic Pro</h3>
            <p className="text-brand-text">
              A melhor barbearia da cidade, oferecendo serviços de qualidade com profissionais experientes.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-brand-accent mb-4">Horário de Funcionamento</h4>
            <p className="text-brand-text">Segunda a Sexta: 9h às 19h</p>
            <p className="text-brand-text">Sábado: 8h às 17h</p>
            <p className="text-brand-text">Domingo: Fechado</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-brand-accent mb-4">Contato</h4>
            <p className="text-brand-text">Telefone: (11) 99999-9999</p>
            <p className="text-brand-text">Email: contato@stylechicpro.com</p>
            <p className="text-brand-text">Endereço: Rua das Barbas, 123 - Centro</p>
          </div>
        </div>
        <div className="border-t border-brand-surface mt-8 pt-8 text-center">
          <p className="text-brand-text">
            © 2024 StyleChic Pro. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};