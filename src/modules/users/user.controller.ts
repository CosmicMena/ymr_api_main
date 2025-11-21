import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiConsumes,
  ApiProduces,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto, CreateUserDto, UpdateUserDto, UserFilterDto } from './dto/user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { SuccessResponseDto } from '../../common/dto/response.dto';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('admin')
  @ApiOperation({
    summary: 'Criar novo usuário',
    description: 'Cria um novo usuário no sistema com validação de dados e verificações de duplicação',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Dados do usuário a ser criado',
    examples: {
      usuarioCompleto: {
        summary: 'Usuário Completo',
        value: {
          name: 'João Silva Santos',
          email: 'joao.silva@email.com',
          phone: '+244 912 345 678',
          birthDate: '1990-05-15',
          address: 'Rua da Independência, 123, Apt 45',
          city: 'Luanda',
          country: 'Angola',
          company: 'Tech Solutions Angola',
          position: 'Gerente de TI',
          avatarUrl: 'https://exemplo.com/avatars/joao-silva.jpg',
          emailVerified: false,
          isActive: true,
          preferredContactMethod: 'email',
        },
      },
      usuarioBasico: {
        summary: 'Usuário Básico',
        value: {
          name: 'Maria Fernanda',
          email: 'maria.fernanda@gmail.com',
          country: 'Angola',
          emailVerified: false,
          isActive: true,
          preferredContactMethod: 'email',
        },
      },
      usuarioEmpresarial: {
        summary: 'Usuário Empresarial',
        value: {
          name: 'Carlos Eduardo Mendes',
          email: 'carlos.mendes@empresa.co.ao',
          phone: '+244 923 456 789',
          city: 'Benguela',
          country: 'Angola',
          company: 'Petróleo & Gás Angola',
          position: 'Diretor Comercial',
          emailVerified: true,
          isActive: true,
          preferredContactMethod: 'phone',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' },
        name: { type: 'string', example: 'João Silva Santos' },
        email: { type: 'string', example: 'joao.silva@email.com' },
        country: { type: 'string', example: 'Angola' },
        isActive: { type: 'boolean', example: true },
        createdAt: { type: 'string', example: '2024-08-24T10:30:00.000Z' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos ou campos obrigatórios ausentes',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'E-mail já está em uso por outro usuário',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para criar usuários',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Listar todos os usuários',
    description: 'Retorna uma lista paginada de usuários com filtros opcionais',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página (padrão: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Quantidade de itens por página (padrão: 10, máximo: 100)',
    example: 20,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Termo de busca por nome, e-mail ou empresa',
    example: 'joão silva',
  })
  @ApiQuery({
    name: 'city',
    required: false,
    type: String,
    description: 'Filtrar por cidade',
    example: 'Luanda',
  })
  @ApiQuery({
    name: 'country',
    required: false,
    type: String,
    description: 'Filtrar por país',
    example: 'Angola',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    type: Boolean,
    description: 'Filtrar por status ativo',
    example: true,
  })
  @ApiQuery({
    name: 'emailVerified',
    required: false,
    type: Boolean,
    description: 'Filtrar por e-mail verificado',
    example: true,
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Campo para ordenação (name, email, createdAt, lastLogin)',
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    type: String,
    description: 'Ordem da ordenação (asc, desc)',
    example: 'desc',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de usuários retornada com sucesso',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              city: { type: 'string' },
              country: { type: 'string' },
              isActive: { type: 'boolean' },
              emailVerified: { type: 'boolean' },
              createdAt: { type: 'string' },
              lastLogin: { type: 'string' },
            },
          },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para listar usuários',
  })
  async findAll(@Query() paginationDto: PaginationDto, @Query() filterDto: UserFilterDto) {
    return this.userService.findAll(paginationDto, filterDto);
  }

  @Get('active')
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Listar usuários ativos',
    description: 'Retorna apenas os usuários com status ativo',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Quantidade de usuários a retornar (padrão: 50)',
    example: 20,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de usuários ativos retornada com sucesso',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          city: { type: 'string' },
          isActive: { type: 'boolean' },
        },
      },
    },
  })
  async findActiveUsers(@Query('limit') limit: number = 50) {
    return this.userService.findActiveUsers(limit);
  }

  @Get('stats')
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Obter estatísticas dos usuários',
    description: 'Retorna estatísticas gerais sobre os usuários do sistema',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Estatísticas retornadas com sucesso',
    schema: {
      type: 'object',
      properties: {
        totalUsers: { type: 'number', example: 1250 },
        activeUsers: { type: 'number', example: 1100 },
        verifiedUsers: { type: 'number', example: 850 },
        newUsersThisMonth: { type: 'number', example: 45 },
        usersByCountry: {
          type: 'object',
          properties: {
            Angola: { type: 'number', example: 1000 },
            Brasil: { type: 'number', example: 200 },
            Portugal: { type: 'number', example: 50 },
          },
        },
        usersByCities: {
          type: 'object',
          properties: {
            Luanda: { type: 'number', example: 600 },
            Benguela: { type: 'number', example: 200 },
            Huambo: { type: 'number', example: 150 },
          },
        },
      },
    },
  })
  async getUserStats() {
    return this.userService.getUserStats();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obter usuário por ID',
    description: 'Retorna um usuário específico pelo seu ID único',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do usuário',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário encontrado com sucesso',
    type: UserDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado',
  })
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin', 'manager')
  @ApiOperation({
    summary: 'Atualizar usuário',
    description: 'Atualiza um usuário existente pelo ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do usuário a ser atualizado',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'Dados parciais do usuário para atualização',
    examples: {
      atualizacaoPerfil: {
        summary: 'Atualização de Perfil',
        value: {
          name: 'João Silva Santos Junior',
          phone: '+244 912 345 999',
          address: 'Rua Nova da Independência, 456',
          position: 'Diretor de TI',
        },
      },
      atualizacaoContato: {
        summary: 'Atualização de Contato',
        value: {
          email: 'joao.novo@email.com',
          phone: '+244 923 456 789',
          preferredContactMethod: 'phone',
        },
      },
      verificacaoEmail: {
        summary: 'Verificação de E-mail',
        value: {
          emailVerified: true,
        },
      },
      ativacaoUsuario: {
        summary: 'Ativação/Desativação',
        value: {
          isActive: false,
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        isActive: { type: 'boolean' },
        updatedAt: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos para atualização',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'E-mail já está em uso por outro usuário',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para atualizar usuários',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id/verify-email')
  @Roles('admin')
  @ApiOperation({
    summary: 'Verificar e-mail do usuário',
    description: 'Marca o e-mail do usuário como verificado',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do usuário',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'E-mail verificado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        emailVerified: { type: 'boolean', example: true },
        updatedAt: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async verifyEmail(@Param('id') id: string) {
    return this.userService.verifyEmail(id);
  }

  @Patch(':id/toggle-status')
  @Roles('admin')
  @ApiOperation({
    summary: 'Alternar status do usuário',
    description: 'Alterna entre ativo e inativo o status do usuário',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do usuário',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status alterado com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        isActive: { type: 'boolean' },
        updatedAt: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  async toggleStatus(@Param('id') id: string) {
    return this.userService.toggleStatus(id);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({
    summary: 'Remover usuário',
    description: 'Remove permanentemente um usuário do sistema',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID único do usuário a ser removido',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário removido com sucesso',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuário não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Usuário não pode ser removido (ex: possui pedidos ativos)',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Usuário sem permissão para remover usuários',
  })
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Get('example')
  @ApiOperation({
    summary: 'Exemplo de usuário',
    description: 'Retorna um exemplo de estrutura de usuário para referência',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retorna um usuário de exemplo',
    type: UserDto,
  })
  getExampleUser() {
    return {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      name: 'João Silva Santos',
      email: 'joao.silva@email.com',
      phone: '+244 912 345 678',
      birthDate: '1990-05-15',
      address: 'Rua da Independência, 123, Apt 45',
      city: 'Luanda',
      country: 'Angola',
      company: 'Tech Solutions Angola',
      position: 'Gerente de TI',
      avatarUrl: 'https://exemplo.com/avatars/joao-silva.jpg',
      emailVerified: true,
      isActive: true,
      preferredContactMethod: 'email',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
  }
}