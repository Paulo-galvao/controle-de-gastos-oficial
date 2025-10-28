# controle-de-gastos-oficial

Projeto final de desenvolvimento web do curso de Liderança em Tecnologia finalizado em dezembro de 2024.

Para projeto de finalização do curso, o desafio foi desenvolver uma API em Node com banco de dados não relacional.
Trata-se de um sistema onde usuários podem registar categorias de gastos. Em cada categoria podem ser registrados produtos e seus respectivos valores.
Cada categoria tem um nome e valor total. O valor total é calculado automaticamente a medida que novos produtos são inseridos, atualizados ou excluidos.

Existe um relacionamento 1:N entre usuários e categorias.
Assim como entre categorias e produtos.

Como extra usei o pacote express-handlebars para gerar views a partir das rotas da API.
