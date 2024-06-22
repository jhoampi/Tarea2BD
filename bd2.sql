PGDMP      5                |            dbtarea2    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16558    dbtarea2    DATABASE     {   CREATE DATABASE dbtarea2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Chile.1252';
    DROP DATABASE dbtarea2;
                postgres    false            �            1259    16583    Correo    TABLE     �   CREATE TABLE public."Correo" (
    id integer NOT NULL,
    "usuarioId" integer NOT NULL,
    asunto text NOT NULL,
    contenido text NOT NULL,
    favorito boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Correo";
       public         heap    postgres    false            �            1259    16582    Correo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Correo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Correo_id_seq";
       public          postgres    false    219            �           0    0    Correo_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Correo_id_seq" OWNED BY public."Correo".id;
          public          postgres    false    218            �            1259    16573    Usuario    TABLE     �   CREATE TABLE public."Usuario" (
    id integer NOT NULL,
    nombre text NOT NULL,
    correo text NOT NULL,
    clave text NOT NULL,
    descripcion text,
    bloqueado boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Usuario";
       public         heap    postgres    false            �            1259    16572    Usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Usuario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Usuario_id_seq";
       public          postgres    false    217            �           0    0    Usuario_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Usuario_id_seq" OWNED BY public."Usuario".id;
          public          postgres    false    216            �            1259    16561    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false            '           2604    16586 	   Correo id    DEFAULT     j   ALTER TABLE ONLY public."Correo" ALTER COLUMN id SET DEFAULT nextval('public."Correo_id_seq"'::regclass);
 :   ALTER TABLE public."Correo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            %           2604    16576 
   Usuario id    DEFAULT     l   ALTER TABLE ONLY public."Usuario" ALTER COLUMN id SET DEFAULT nextval('public."Usuario_id_seq"'::regclass);
 ;   ALTER TABLE public."Usuario" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �          0    16583    Correo 
   TABLE DATA           P   COPY public."Correo" (id, "usuarioId", asunto, contenido, favorito) FROM stdin;
    public          postgres    false    219          �          0    16573    Usuario 
   TABLE DATA           V   COPY public."Usuario" (id, nombre, correo, clave, descripcion, bloqueado) FROM stdin;
    public          postgres    false    217   k       �          0    16561    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   �       �           0    0    Correo_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Correo_id_seq"', 1, false);
          public          postgres    false    218            �           0    0    Usuario_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Usuario_id_seq"', 10, true);
          public          postgres    false    216            /           2606    16591    Correo Correo_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Correo"
    ADD CONSTRAINT "Correo_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Correo" DROP CONSTRAINT "Correo_pkey";
       public            postgres    false    219            -           2606    16581    Usuario Usuario_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT "Usuario_pkey";
       public            postgres    false    217            *           2606    16569 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            +           1259    16592    Usuario_correo_key    INDEX     S   CREATE UNIQUE INDEX "Usuario_correo_key" ON public."Usuario" USING btree (correo);
 (   DROP INDEX public."Usuario_correo_key";
       public            postgres    false    217            0           2606    16593    Correo Correo_usuarioId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Correo"
    ADD CONSTRAINT "Correo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Correo" DROP CONSTRAINT "Correo_usuarioId_fkey";
       public          postgres    false    4653    219    217            �   S   x��1�0 �^���&��U��B��]n�puKp��Is�P(S�!S|�3�	��̔C�˔�*o��!��#"�}W�      �   n  x�m�KN�0�דS� (jS��� !ش]���3I\��������!5��3����sx��.���*�X�M�)��@�!����������ˊ�D��uV��^����]H|��qxA &�:��,l��Q��J�� ^�e�|I�*�*:�U�n��ɥ>�b/�v(�[?�n��o�����PN"������`T9Q�m����	:���n�"M1�<[8�/��Kʆ�=ϯ�Aq��c�%��NM!��{%ϳ��G���&1AAZ��uv�F��8/���c�4�#� 5��ߣ�ػ�_�\.O`ɳ����^�(x������|b����PEz��(WM3>��A�C̼�Y�� �F��      �   �   x�m���0�j{�, �~�<D&0�t�&U�G�: ;��R!18�"ֹ��,��	+(�/J�%O���B��#;�6�\�
f�����D��!�V�݈w�t3FU/ ?F �L����k9�_�~м������u}��-}     