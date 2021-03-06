# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180319220933) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chatrooms", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "private", default: false, null: false
    t.integer "admin_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_chatrooms_on_admin_id"
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "friend1_id", null: false
    t.integer "friend2_id", null: false
    t.boolean "friends?", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend1_id", "friend2_id"], name: "index_friendships_on_friend1_id_and_friend2_id", unique: true
    t.index ["friend1_id"], name: "index_friendships_on_friend1_id"
    t.index ["friend2_id"], name: "index_friendships_on_friend2_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.integer "member_id", null: false
    t.integer "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_memberships_on_channel_id"
    t.index ["member_id"], name: "index_memberships_on_member_id"
  end

  create_table "messages", force: :cascade do |t|
    t.text "body", null: false
    t.integer "author_id", null: false
    t.integer "chatroom_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "author_name", null: false
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["chatroom_id"], name: "index_messages_on_chatroom_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
