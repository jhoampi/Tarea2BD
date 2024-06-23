PGDMP      	                |            BD2    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    22466    BD2    DATABASE     x   CREATE DATABASE "BD2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Chile.1252';
    DROP DATABASE "BD2";
                postgres    false            �            1259    22467    Correo    TABLE     �   CREATE TABLE public."Correo" (
    id integer NOT NULL,
    "usuarioId" integer NOT NULL,
    asunto text NOT NULL,
    contenido text NOT NULL,
    favorito boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Correo";
       public         heap    postgres    false            �            1259    22473    Usuario    TABLE     �   CREATE TABLE public."Usuario" (
    id integer NOT NULL,
    nombre text NOT NULL,
    correo text NOT NULL,
    clave text NOT NULL,
    descripcion text,
    bloqueado boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Usuario";
       public         heap    postgres    false            �            1259    22479    Usuario_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Usuario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Usuario_id_seq";
       public          postgres    false    216            �           0    0    Usuario_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Usuario_id_seq" OWNED BY public."Usuario".id;
          public          postgres    false    217            �            1259    22480    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
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
       public         heap    postgres    false            Y           2604    22487 
   Usuario id    DEFAULT     l   ALTER TABLE ONLY public."Usuario" ALTER COLUMN id SET DEFAULT nextval('public."Usuario_id_seq"'::regclass);
 ;   ALTER TABLE public."Usuario" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216            �          0    22467    Correo 
   TABLE DATA           P   COPY public."Correo" (id, "usuarioId", asunto, contenido, favorito) FROM stdin;
    public          postgres    false    215          �          0    22473    Usuario 
   TABLE DATA           V   COPY public."Usuario" (id, nombre, correo, clave, descripcion, bloqueado) FROM stdin;
    public          postgres    false    216   �       �          0    22480    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    218   +                   0    0    Usuario_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Usuario_id_seq"', 19, true);
          public          postgres    false    217            _           2606    22489    Correo Correo_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public."Correo"
    ADD CONSTRAINT "Correo_pkey" PRIMARY KEY (id, "usuarioId");
 @   ALTER TABLE ONLY public."Correo" DROP CONSTRAINT "Correo_pkey";
       public            postgres    false    215    215            b           2606    22491    Usuario Usuario_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT "Usuario_pkey";
       public            postgres    false    216            d           2606    22493 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    218            ]           1259    22494    Correo_id_usuarioId_key    INDEX     `   CREATE UNIQUE INDEX "Correo_id_usuarioId_key" ON public."Correo" USING btree (id, "usuarioId");
 -   DROP INDEX public."Correo_id_usuarioId_key";
       public            postgres    false    215    215            `           1259    22495    Usuario_correo_key    INDEX     S   CREATE UNIQUE INDEX "Usuario_correo_key" ON public."Usuario" USING btree (correo);
 (   DROP INDEX public."Usuario_correo_key";
       public            postgres    false    216            e           2606    22496    Correo Correo_usuarioId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Correo"
    ADD CONSTRAINT "Correo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Correo" DROP CONSTRAINT "Correo_usuarioId_fkey";
       public          postgres    false    216    215    4706            �   �   x�-�Mj1F��)t�ON0��6�I��.�GM�e�S����E!��=d�Z����8�M��	��)���q4c��t^	���2�����q]N�c�{��3f��ٷ�� �T|x��� �\����z�;��-���̒0)4P�+3��6A�ؓ���)�����������7�Lm���2�2j�p�}�)�Ӗŧ��ۋ1��pZ      �   ,  x��R�n�0<���P�lG�Mm���!�����2�T����V?�?�%-9i�K�\����p
�F΋�#���EM/8����0�s'c;x �Z9���/-:�� �2Q Z��(���.����/������U`O6��P�n�����{�C�^z4Nz3`����V�;���p���}�������5|"}�Ajh�"���q�{R4��-�BY��V.�Rh#�E:O�t��h����ўuwؐ��yTh��'L?&��P�r�ro�������^K�N���� %.���&Gϓ&_��7#�|���Őb=ڟb��T*�T�}��o��a$�E8�"b
��耺�F��5�;u?�T��b�-a��Y ?ˤ����ǭ��R"V�[�=�
��2�ů`��S4E�����EZl����sޘ�.�C��k,���WU5_pi�򈂣��03�Q�PK6�KS���)�o��6ɏ� ,k'���YQ�#�"��u����p���g��Eܸ���p���i~$��;t���$7�h�a��s�|�=ϲ��.nD      �   �  x�}�]n$7��ǧ�� �_�!r�IAY��?�w�؆�F?4Zb�WŢt�@`4�>����V��$ ~���c�.7�K璽b�ϥ�8�![��'��p�D�a]:tn�ǷNW�k�G%���
�����_�?/��x�?��᣿��C�_�m��V�R����w��p|�6��
�ir8��dsF�NM�EqJI��E��Я�J��`o����}����n��U���o~�<|$���C����R�����u�Ζ]}�;Ozd��h��@��:Q�Itd���tw�A�����Hġ��F ���������|"��R'��x��޴k< ڜpڀY�A�"i�b��'d��
Ya�%
K��z�n@��7�k1�����D~tg���K�{i��*����9�iYh^?mf�iT�����^^Z�c����ȁ�kڴ:4�R���j`��
3*���U^{/��|-��R��Tdo^�	�7N�6h�6p��d�r6jJ�����=]��%��-�5�@J���{KG�0���z����իw�%A3�>w-3nO?o_
�R��x�+����mmf%�7X%P�^vq]dǣ����B+|4Шv-�:֙Y]�T�p�d��@(�@F����4<
/�����������gGJ�     