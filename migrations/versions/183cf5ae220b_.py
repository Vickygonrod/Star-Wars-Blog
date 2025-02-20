"""empty message

Revision ID: 183cf5ae220b
Revises: ea75297ab2ee
Create Date: 2024-06-09 13:53:38.341324

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '183cf5ae220b'
down_revision = 'ea75297ab2ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('followers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_from_id', sa.Integer(), nullable=True),
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_from_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('followers')
    # ### end Alembic commands ###
